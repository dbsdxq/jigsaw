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
  }


})