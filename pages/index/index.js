// index.js

// 获取应用实例
const app = getApp()

Page({
  data: {
    // 拼图碎片
    pictures: [
      [{
        fragment_no: 1,
        styles: '',
      },
      {
        fragment_no: 2,
        styles: '',
      },
      {
        fragment_no: 3,
        styles: '',
      },
      {
        fragment_no: 3,
        styles: '',
      },
      ],
      [{
        fragment_no: 4,
        styles: '',
      },
      {
        fragment_no: 5,
        styles: '',
      },
      {
        fragment_no: 6,
        styles: '',
      },
      ],
      [{
        fragment_no: 7,
        styles: '',
      },
      {
        fragment_no: 8,
        styles: '',
      },
      {
        // 认定9号碎片显示为空白或者说最后一块默认为空白
        fragment_no: 9,
        styles: '',
      },
      ]
    ],
    // 拼图图片地址
    jigsaw_img_url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3848402655,92542552&fm=26&gp=0.jpg',
    grid: 3, // 控制布局矩阵大小
  },
  onLoad() {
    console.log('onload');
    this.init()
  },
  // 初始化
  init() {
    const grid = this.data.grid;//控制矩阵大小
    const width = `${750 / grid}`
    const blank_no = this.get_blank_no();
    const arr = [];
    let bg_img = `background-image:url(${this.data.jigsaw_img_url}`;
    for (let i = 0; i < grid; i++) {
      let row = [];
      for (let j = 0; j < grid; j++) {
        let col = {
          fragment_no: i * grid + j + 1,
          styles: [
            `background-position: ${-width * j}rpx ${-width * i}rpx`,
            `width:${width}rpx`,
            `height:${width}rpx`
          ],
        }
        col.styles.push(`${col.fragment_no != blank_no ? bg_img : "background: transparent"}`);
        col.styles = col.styles.join(';')
        row.push(col);
      }
      arr.push(row)
    }
    this.setData({
      pictures: arr
    })
  },
  // 获取空白编号
  get_blank_no() {
    return this.data.grid * this.data.grid
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
    const blank_no = this.get_blank_no()
    const pictures = this.data.pictures;
    let temp = null;
    let target_row_index = 0;
    let target_col_index = 0;
    // 判断点击位置的附近是否存在空白块儿
    // 上方
    if (pictures[row_index - 1]) {
      target_row_index = row_index - 1;
      target_col_index = col_index;
      temp = pictures[target_row_index][target_col_index];
      if (temp.fragment_no !== blank_no) {
        temp = null
      }
    }
    if (!temp && pictures[row_index + 1]) {
      // 下方
      target_row_index = row_index + 1;
      target_col_index = col_index;
      temp = pictures[target_row_index][target_col_index];
      if (temp.fragment_no !== blank_no) {
        temp = null
      }
    }
    if (!temp && pictures[row_index][col_index - 1]) {
      // 左边
      target_row_index = row_index;
      target_col_index = col_index - 1;
      temp = pictures[target_row_index][target_col_index];
      if (temp.fragment_no !== blank_no) {
        temp = null
      }
    }
    if (!temp && pictures[row_index][col_index + 1]) {
      // 右边
      target_row_index = row_index;
      target_col_index = col_index + 1;
      temp = pictures[target_row_index][target_col_index];
      if (temp.fragment_no !== blank_no) {
        temp = null
      }
    }
    // 说明点击的位置旁边有空白块
    if (temp && temp.fragment_no === blank_no) {
      const target = temp;
      temp = pictures[row_index][col_index];
      pictures[row_index][col_index] = target;
      pictures[target_row_index][target_col_index] = temp;
      this.setData({
        pictures
      })
    }
  },
  // 重新开始新游戏
  restart(random = true) {
    const grid = this.data.grid;
    // 数组降维并乱序
    const pictures = this.data.pictures.flat(Infinity)
    if (random) {
      pictures.sort(function () {
        return Math.random() > 0.5 ? 1 : -1
      })
    } else {
      pictures.sort(function (a, b) {
        return a.fragment_no - b.fragment_no
      })
    }
    const len = pictures.length;
    const arr = [];
    // 重新恢复二维数组
    for (let i = 0; i < len;) {
      arr.push(pictures.slice(i, i += grid))
    }
    this.setData({
      pictures: arr
    })
  },
  // 判断游戏拼图成功
  game_finish() {
    return this.data.pictures.flat(Infinity).every((v, index) => v.fragment_no == index + 1)
  },
  // 更换拼图图片
  choose_img(e) {
    const that = this
    wx.chooseImage({
      counnt: 1,
      sizeType: 'compressed',
      success: (res) => {
        const img_url = res.tempFilePaths[0]
        // this.setData({
        //   jigsaw_img_url: img_url
        // })
        // this.init()
        wx.getImageInfo({
          src: img_url,
          success: (res) => {
            console.log(res.width)
            console.log(res.height)
            const origin_width = res.width
            const origin_height = res.height
            var ctx = wx.createCanvasContext('myCanvas')
            ctx.drawImage(img_url, 0, 0, origin_width, origin_height, 0, 0, 375, 375)
            ctx.draw(false, function () {
              wx.canvasToTempFilePath({
                canvasId: 'myCanvas',
                x: 0,
                y: 0,
                width: 375,
                height: 375,
                destWidth: 375,
                destHeight: 375,
                success: (res) => {
                  console.log(res.tempFilePath)
                  that.setData({
                    jigsaw_img_url: res.tempFilePath
                  })
                  that.init()
                }
              })
            })
          }
        })
      },
      fail(e) {
        console.log(e);
        wx.showToast({
          title: '更换图片失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 置位
  reset() {
    this.restart(false)
  },
})