// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    pictures: [
      [{
        fragment_no: 1
      },
      {
        fragment_no: 2
      },
      {
        fragment_no: 3
      },
      ],
      [{
        fragment_no: 4
      },
      {
        fragment_no: 5
      },
      {
        fragment_no: 6
      },
      ],
      [{
        fragment_no: 7
      },
      {
        fragment_no: 8
      },
      {
        // 认定9号碎片显示为空白
        fragment_no: 9
      },
      ]
    ]
  },
  // 点击图片
  click_pic(e) {
    const row_index = e.target.dataset.rowIndex;
    const col_index = e.target.dataset.colIndex;
    this.update_position_by_index(row_index, col_index);
    if (this.game_finish()) {
      wx.showModal({
        title: '拼图游戏',
        content: '游戏拼图成功',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  update_position_by_index(row_index, col_index) {
    const pictures = this.data.pictures;
    let temp = null;
    let target_row_index = 0;
    let target_col_index = 0;
    // 上方
    if (pictures[row_index - 1]) {
      target_row_index = row_index - 1;
      target_col_index = col_index;
      temp = pictures[target_row_index][target_col_index];
      if (temp.fragment_no !== 9) {
        temp = null
      }
    }
    if (!temp && pictures[row_index + 1]) {
      // 下方
      target_row_index = row_index + 1;
      target_col_index = col_index;
      temp = pictures[target_row_index][target_col_index];
      if (temp.fragment_no !== 9) {
        temp = null
      }
    }
    if (!temp && pictures[row_index][col_index - 1]) {
      // 左边
      target_row_index = row_index;
      target_col_index = col_index - 1;
      temp = pictures[target_row_index][target_col_index];
      if (temp.fragment_no !== 9) {
        temp = null
      }
    }
    if (!temp && pictures[row_index][col_index + 1]) {
      // 右边
      target_row_index = row_index;
      target_col_index = col_index + 1;
      temp = pictures[target_row_index][target_col_index];
      if (temp.fragment_no !== 9) {
        temp = null
      }
    }
    // 说明点击的位置旁边有空白块
    if (temp && temp.fragment_no === 9) {
      const target = temp;
      temp = pictures[row_index][col_index];
      pictures[row_index][col_index] = target;
      pictures[target_row_index][target_col_index] = temp;
      this.setData({
        pictures
      })
    }
  },
  // 重新开始游戏
  restart() {
    const pictures = this.data.pictures.flat(Infinity).sort(function () {
      return Math.random() > 0.5 ? 1 : -1
    })
    const len = pictures.length;
    const arr = [];
    for (let i = 0; i < len;) {
      arr.push(pictures.slice(i, i += 3))
    }
    this.setData({
      pictures: arr
    })
  },
  // 判断游戏拼图成功
  game_finish() {
    return this.data.pictures.flat(Infinity).map(v => v.fragment_no).join(',') === '1,2,3,4,5,6,7,8,9'
  }
})