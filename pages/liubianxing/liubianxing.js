// pages/liubianxing/liubianxing.js
const Puzzle = require('../utils/Puzzle')

let puzzle = new Puzzle()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        img_src: "https://636c-cloud-dbsdxq-675mm-1304230830.tcb.qcloud.la/strawberry.jpg",
        // img_src: "/img/strawberry.jpg",
        liubianxing_pic: [
            [
                {
                    className: 'pic1-1',
                    flag: 0,
                    fragment_no: 0,
                },
                {
                    className: 'pic1-2',
                    flag: 0,
                    fragment_no: 1,
                },
                {
                    className: 'pic1-3',
                    flag: 0,
                    fragment_no: 2,
                },
                {
                    className: 'pic1-4',
                    flag: 0,
                    fragment_no: 3,
                }
            ],
            [{
                className: 'pic2-1',
                flag: 0,
                fragment_no: 4,
            },
            {
                className: 'pic2-2',
                fragment_no: 5,
            },
            {
                className: 'pic2-3',
                fragment_no: 6,

            },
            {
                className: 'pic2-4',
                fragment_no: 7,
            }
            ],
            [{
                className: 'pic3-1',
                fragment_no: 8,
            },
            {
                className: 'pic3-2',
                fragment_no: 9,
            },
            {
                className: 'pic3-3',
                fragment_no: 10,
            },
            {
                className: 'pic3-4',
                fragment_no: 11,
            }
            ],
            [{
                className: 'pic4-1',
                fragment_no: 12,
            },
            {
                className: 'pic4-2',
                fragment_no: 13,
            },
            {
                className: 'pic4-3',
                fragment_no: 14,
            },
            {
                className: 'pic4-4',
                flag: 1,
                fragment_no: 15,
            }
            ]
        ],
        backup_liubianxing: [
            {
                className: 'pic1-1',
                flag: 0,
                fragment_no: 0,
            },
            {
                className: 'pic1-2',
                flag: 0,
                fragment_no: 1,
            },
            {
                className: 'pic1-3',
                flag: 0,
                fragment_no: 2,
            },
            {
                className: 'pic1-4',
                flag: 0,
                fragment_no: 3,
            }
            ,
            {
                className: 'pic2-1',
                flag: 0,
                fragment_no: 4,
            },
            {
                className: 'pic2-2',
                fragment_no: 5,
            },
            {
                className: 'pic2-3',
                fragment_no: 6,

            },
            {
                className: 'pic2-4',
                fragment_no: 7,
            }
            ,
            {
                className: 'pic3-1',
                fragment_no: 8,
            },
            {
                className: 'pic3-2',
                fragment_no: 9,
            },
            {
                className: 'pic3-3',
                fragment_no: 10,
            },
            {
                className: 'pic3-4',
                fragment_no: 11,
            }
            ,
            {
                className: 'pic4-1',
                fragment_no: 12,
            },
            {
                className: 'pic4-2',
                fragment_no: 13,
            },
            {
                className: 'pic4-3',
                fragment_no: 14,
            },
            {
                className: 'pic4-4',
                flag: 1,
                fragment_no: 15,
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.testData = 1
        console.log("二维数组的长度", this.data.liubianxing_pic.length)
        // this.test();
        console.log('object', this.testData);
    },
    click_pic(e) {
        var count = this.data.count
        const row_index = e.target.dataset.rowIndex;
        const col_index = e.target.dataset.colIndex;
        console.log('row_index', row_index)
        console.log('col_index', col_index)
        // for(var i=0;i<this.data.liubianxing_pic;i++)
        //   for(var j=0;j<this.data.liubianxing_pic[0].length;j++)
        //   {

        //   }
        var row = this.data.liubianxing_pic
        // var white_row=this.data.liubianxing_pic.length-1
        var white_col = this.data.liubianxing_pic[0].length - 1
        //偶数行
        if (row_index % 2 == 0) {
            //判断上方
            // row-1 === white_row;
            if (row[row_index - 1] && row[row_index - 1][col_index] && row[row_index - 1][col_index].flag == 1) {
                var temp = row[row_index - 1][col_index];
                row[row_index - 1][col_index] = row[row_index][col_index];
                row[row_index][col_index] = temp
                count++
            }
            if (col_index != 0 && row[row_index - 1] && row[row_index - 1][col_index - 1] && row[row_index - 1][col_index - 1].flag == 1) {
                var temp = row[row_index - 1][col_index - 1];
                row[row_index - 1][col_index - 1] = row[row_index][col_index];
                row[row_index][col_index] = temp
                count++
            }
            //判断下方
            if (row[row_index + 1] && row[row_index + 1][col_index] && row[row_index + 1][col_index].flag == 1) {
                var temp = row[row_index + 1][col_index];
                row[row_index + 1][col_index] = row[row_index][col_index];
                row[row_index][col_index] = temp
                count++
            }
            if (col_index != 0 && row[row_index + 1] && row[row_index + 1][col_index - 1] && row[row_index + 1][col_index - 1].flag == 1) {
                var temp = row[row_index + 1][col_index - 1];
                row[row_index + 1][col_index - 1] = row[row_index][col_index];
                row[row_index][col_index] = temp
                count++
            }
            //判断左边
            if (col_index != 0 && row[row_index][col_index - 1] && row[row_index][col_index - 1].flag == 1) {
                var temp = row[row_index][col_index - 1];
                row[row_index][col_index - 1] = row[row_index][col_index];
                row[row_index][col_index] = temp
                count++
            }
            //判断右边
            if (col_index != this.data.liubianxing_pic[0].length - 1 && row[row_index][col_index + 1] && row[row_index][col_index + 1].flag == 1) {
                var temp = row[row_index][col_index + 1];
                row[row_index][col_index + 1] = row[row_index][col_index];
                row[row_index][col_index] = temp
                count++
            }
        }
        //奇数行
        if (row_index % 2 != 0) {
            //判断上方
            // row-1 === white_row;
            if (row[row_index - 1] && row[row_index - 1][col_index] && row[row_index - 1][col_index].flag == 1) {
                var temp = row[row_index - 1][col_index];
                row[row_index - 1][col_index] = row[row_index][col_index];
                row[row_index][col_index] = temp
                count++
            }
            if (col_index != this.data.liubianxing_pic[0].length - 1 && row[row_index - 1] && row[row_index - 1][col_index + 1] && row[row_index - 1][col_index + 1].flag == 1) {
                var temp = row[row_index - 1][col_index + 1];
                row[row_index - 1][col_index + 1] = row[row_index][col_index];
                row[row_index][col_index] = temp
                count++
            }
            //判断下方
            if (row[row_index + 1] && row[row_index + 1][col_index] && row[row_index + 1][col_index].flag == 1) {
                var temp = row[row_index + 1][col_index];
                row[row_index + 1][col_index] = row[row_index][col_index];
                row[row_index][col_index] = temp
                count++
            }
            if (col_index != this.data.liubianxing_pic[0].length - 1 && row[row_index + 1] && row[row_index + 1][col_index + 1] && row[row_index + 1][col_index + 1].flag == 1) {

                var temp = row[row_index + 1][col_index + 1];
                row[row_index + 1][col_index + 1] = row[row_index][col_index];
                row[row_index][col_index] = temp
                count++
            }
            //判断左边
            if (col_index != 0 && row[row_index][col_index - 1] && row[row_index][col_index - 1].flag == 1) {
                var temp = row[row_index][col_index - 1];
                row[row_index][col_index - 1] = row[row_index][col_index];
                row[row_index][col_index] = temp
                count++
            }
            //判断右边
            if (col_index != this.data.liubianxing_pic[0].length - 1 && row[row_index][col_index + 1] && row[row_index][col_index + 1].flag == 1) {
                var temp = row[row_index][col_index + 1];
                row[row_index][col_index + 1] = row[row_index][col_index];
                row[row_index][col_index] = temp
                count++
            }
        }
        this.setData({
            liubianxing_pic: row,
            count: count
        })
        if (this.game_finish()) {
            wx.showToast({
                title: '恭喜过关',
            })
        }

    },
    // 判断游戏拼图成功
    game_finish() {
        return this.data.liubianxing_pic.flat(Infinity).every((v, index) => v.fragment_no == index)
    },
    test: function () {
        var row = this.data.liubianxing_pic.length;
        var col = this.data.liubianxing_pic[0].length;
        var arr = this.data.liubianxing_pic.flat(Infinity);
        var sortArr = new Array();
        var len = arr.length; //获取数组长度指定随机次数 
        for (var i = 0; i < len;) {
            var index = Math.floor(Math.random() * len);
            if (arr[index] != null) {
                sortArr.push(arr[index]);
                i++;
                arr[index] = null;
            }
        }
        var k = 0;
        var temp = new Array();
        for (var i = 0; i < row; i++) {
            temp[i] = new Array();
            for (var j = 0; j < col; j++) {
                temp[i][j] = sortArr[k++];

            }
        }
        console.log(sortArr);
        this.setData({
            liubianxing_pic: temp
        })
    },
    // 提示
    prompt() {
        var arr = this.data.liubianxing_pic.flat(Infinity).map((v, index) => v.fragment_no);
        puzzle = new Puzzle()
        puzzle.setCoordinateBygrid(4)
        puzzle.setOrder(arr)
        var backup_liubianxing = this.data.backup_liubianxing;
        puzzle.searchA((process_arr) => {
            setTimeout(() => {
                const liubianxing_pic = process_arr.map((v) => {
                    return backup_liubianxing[v]
                })
                const len = liubianxing_pic.length;
                const arr = [];
                // 重新恢复二维数组
                for (let i = 0; i < len;) {
                    arr.push(liubianxing_pic.slice(i, i += 4))
                }
                this.setData({
                    liubianxing_pic: arr
                })
            }, 300)
        })
        console.log(puzzle);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})