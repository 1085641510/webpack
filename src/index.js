// import myName from './hello';
require('./style/index.css');
import vue from "vue"



var app = new vue({
    el: "#app",
    // data() {
    //     return {

    //     }
    // },
    data: {
        message: 'hello',
        limit: {
            width: 50,
            height: 50
        },
        allData: [{
            x: 20,
            y: 10,
            text: "王鹏强",
            width: 200,
            height: 100,
            checked: false,
            id: 1,
            line: [
            //     {
            //     to: 2,
            //     lineColor:"red",
            //     pointId: [1, 1],//1,2,3,4连接点位置，上右下左,[from,to]
            //     lineId: 1
            // },
            // {
            //     to: 2,
            //     lineColor:"blue",
            //     pointId: [1, 2],//1,2,3,4连接点位置，上右下左,[from,to]
            //     lineId: 2
            // },
            {
                to: 2,
                lineColor:"black",
                pointId: [1, 3],//1,2,3,4连接点位置，上右下左,[from,to]
                lineId: 3
            }      
            ]
        }, {
            x: 300,
            y: 10,
            text: "黄历1",
            width: 300,
            height: 100,
            checked: false,
            id: 2,
            line: [
            //     {
            //     to: 1,
            //     lineColor:"yellow",
            //     pointId: [1, 1],//1,2,3,4连接点位置，上右下左,[from,to]
            //     lineId: 1
            // }
            ]
        },
        //  {
        //     x: 300,
        //     y: 400,
        //     text: "黄历",
        //     width: 100,
        //     height: 20,
        //     checked: false,
        //     id: 3,
        //     line: [
        //         {
        //         to: 2,
        //         lineColor:"red",
        //         pointId: [1, 1],//1,2,3,4连接点位置，上右下左,[from,to]
        //         lineId: 1
        //     }
        //     ]
        // }, {
        //     x: 600,
        //     y: 20,
        //     text: "165gasdag1",
        //     width: 50,
        //     height: 10,
        //     checked: false,
        //     id: 4,
        //     line: [
        //         {
        //         to: 3,
        //         lineColor:"red",
        //         pointId: [1, 1],//1,2,3,4连接点位置，上右下左,[from,to]
        //         lineId: 1
        //     }
        //     ]
        // }
        ],
    },
    methods: {
        trimData() {
            //排序
            this.allData.sort((a, b) => {
                return a.width * a.height - b.width * b.height;
            });
            return this.allData;
        },
        initCanvas(data) {

            var moveCanvas = document.getElementById("myCanvas1");
            var ctx = moveCanvas.getContext("2d");
            ctx.clearRect(0, 0, moveCanvas.width, moveCanvas.height);
            for (let i = 0; i < data.length; i++) {
                ctx.beginPath()
                //ctx.setLineDash([5,5])
                if (data[i].checked) {
                    ctx.strokeStyle = "red"
                    ctx.setLineDash([5, 5])
                }
                else {
                    ctx.strokeStyle = "black"
                    ctx.setLineDash([0, 0])
                }
                //ctx.strokeStyle =data[i].checked?"red":"black";
                ctx.lineWidth = 1;
                ctx.lineJoin = "round";
                ctx.rect(data[i].x, data[i].y, data[i].width, data[i].height);
                ctx.fillText(data[i].text, data[i].x + 20, data[i].y + 50);
                ctx.stroke()
                ctx.closePath();

                ctx.beginPath()
                if (data[i].checked) {
                    ctx.strokeStyle = "black"
                    ctx.setLineDash([0, 0])
                    ctx.rect(data[i].x, data[i].y, 8, 8);
                    ctx.rect(data[i].x - 8 + data[i].width, data[i].y, 8, 8);
                    ctx.rect(data[i].x - 8 + data[i].width, data[i].y + data[i].height - 8, 8, 8);
                    ctx.rect(data[i].x, data[i].y + data[i].height - 8, 8, 8);
                }

                ctx.stroke()
                ctx.save();
                //ctx.restore()
                ctx.closePath();

                var minFlag = 20;
                
                for (let j = 0; j < data[i].line.length; j++) {
                    var beginLine = [], endLine = [];
                    for (let y = 0; y < data.length; y++) {
                        if (data[y].id === data[i].line[j].to) {
                               if(data[i].line[j].pointId[0]===1){
                                   switch (data[i].line[j].pointId[1]){
                                       case 1:
                                        if(data[i].x+data[i].width/2<=data[y].x+data[y].width/2&&data[i].x+data[i].width>data[y].x+data[y].width/2){
                                            if(data[i].y<data[y].y){
                                                beginLine = [data[i].x+ data[i].width/2, data[i].y]
                                                endLine = [data[y].x+ data[y].width/2, data[y].y]
                                                ctx.beginPath();

                                                ctx.strokeStyle = data[i].line[j].lineColor
                                                ctx.moveTo(beginLine[0], beginLine[1])
                                                ctx.lineTo(beginLine[0], beginLine[1]-minFlag)

                                                var maxWidth = Math.max(data[y].width,data[i].width)
                                                ctx.lineTo(beginLine[0]+ maxWidth/2+minFlag, beginLine[1]-minFlag)
                                                ctx.lineTo(beginLine[0]+ maxWidth/2+minFlag, beginLine[1]+data[y].y-data[i].y-minFlag)


                                                ctx.lineTo(endLine[0],  beginLine[1]+data[y].y-data[i].y-minFlag)
                                                ctx.lineTo(endLine[0], endLine[1])
                                                ctx.stroke()
                                                ctx.closePath();
                                            }
                                            else{
                                                beginLine = [data[i].x+ data[i].width/2, data[i].y]
                                                endLine = [data[y].x+ data[y].width/2, data[y].y]
                                                ctx.beginPath();

                                                ctx.strokeStyle = data[i].line[j].lineColor
                                                ctx.moveTo(beginLine[0], beginLine[1])
                                                ctx.lineTo(beginLine[0], beginLine[1]-minFlag)

                                                var maxWidth = Math.max(data[y].width,data[i].width)
                                                ctx.lineTo(beginLine[0]- maxWidth/2-minFlag, beginLine[1]-minFlag)
                                                ctx.lineTo(beginLine[0]- maxWidth/2-minFlag, beginLine[1]+data[y].y-data[i].y-minFlag)


                                                ctx.lineTo(endLine[0],  beginLine[1]+data[y].y-data[i].y-minFlag)
                                                ctx.lineTo(endLine[0], endLine[1])
                                                ctx.stroke()
                                                ctx.closePath();
                                            }
                                           
                                       }

                                       else if(data[i].x<=data[y].x+data[y].width/2&&data[i].x+data[i].width/2>=data[y].x+data[y].width/2){
                                           if(data[i].y>data[y].y){
                                                beginLine = [data[i].x+ data[i].width/2, data[i].y]
                                                endLine = [data[y].x+ data[y].width/2, data[y].y]
                                                ctx.beginPath();

                                                ctx.strokeStyle = data[i].line[j].lineColor
                                                ctx.moveTo(beginLine[0], beginLine[1])
                                                ctx.lineTo(beginLine[0], beginLine[1]-minFlag)

                                                var maxWidth = Math.max(data[y].width,data[i].width)
                                                ctx.lineTo(beginLine[0]+ maxWidth/2+minFlag, beginLine[1]-minFlag)
                                                ctx.lineTo(beginLine[0]+ maxWidth/2+minFlag, beginLine[1]+data[y].y-data[i].y-minFlag)


                                                ctx.lineTo(endLine[0],  beginLine[1]+data[y].y-data[i].y-minFlag)
                                                ctx.lineTo(endLine[0], endLine[1])
                                                ctx.stroke()
                                                
                                                ctx.closePath();
                                            }
                                            else{
                                                beginLine = [data[i].x+ data[i].width/2, data[i].y]
                                                endLine = [data[y].x+ data[y].width/2, data[y].y]
                                                ctx.beginPath();

                                                ctx.strokeStyle = data[i].line[j].lineColor
                                                ctx.moveTo(beginLine[0], beginLine[1])
                                                ctx.lineTo(beginLine[0], beginLine[1]-minFlag)

                                                var maxWidth = Math.max(data[y].width,data[i].width)
                                                ctx.lineTo(beginLine[0]- maxWidth/2-minFlag, beginLine[1]-minFlag)
                                                ctx.lineTo(beginLine[0]- maxWidth/2-minFlag, beginLine[1]+data[y].y-data[i].y-minFlag)
                                                 

                                                ctx.lineTo(endLine[0],  beginLine[1]+data[y].y-data[i].y-minFlag)
                                                ctx.lineTo(endLine[0], endLine[1])
                                                ctx.stroke()
                                                ctx.closePath();
                                            }
                                       }

                                       else if(data[i].x+data[i].width<=data[y].x+data[y].width/2){
                                           if(data[i].y<data[y].y){
                                                beginLine = [data[i].x+ data[i].width/2, data[i].y]
                                                endLine = [data[y].x+ data[y].width/2, data[y].y]
                                                ctx.beginPath();

                                                ctx.strokeStyle = data[i].line[j].lineColor
                                                ctx.moveTo(beginLine[0], beginLine[1])
                                                ctx.lineTo(beginLine[0], beginLine[1]-minFlag)

                                                var maxWidth = Math.max(data[y].width,data[i].width)
                                                ctx.lineTo(data[y].x+ data[y].width/2, beginLine[1]-minFlag)
                                               
                                                ctx.lineTo(endLine[0], endLine[1])
                                                ctx.stroke()
                                                ctx.closePath();
                                            }
                                            else{
                                                if( data[i].x+data[i].width/2<=data[y].x){
                                                    beginLine = [data[i].x+ data[i].width/2, data[i].y]
                                                    endLine = [data[y].x+ data[y].width/2, data[y].y]
                                                    ctx.beginPath();

                                                    ctx.strokeStyle = data[i].line[j].lineColor
                                                    ctx.moveTo(beginLine[0], beginLine[1])
                                                  

                                                    var maxWidth = Math.max(data[y].width,data[i].width)
                                                    ctx.lineTo(beginLine[0], beginLine[1]+data[y].y-data[i].y-minFlag)
                                                 

                                                    ctx.lineTo(endLine[0],  beginLine[1]+data[y].y-data[i].y-minFlag)
                                                    ctx.lineTo(endLine[0], endLine[1])
                                                    ctx.stroke()
                                                    

                                                    ctx.closePath();
                                                }
                                                else{
                                                    beginLine = [data[i].x+ data[i].width/2, data[i].y]
                                                    endLine = [data[y].x+ data[y].width/2, data[y].y]
                                                    ctx.beginPath();

                                                    ctx.strokeStyle = data[i].line[j].lineColor
                                                    ctx.moveTo(beginLine[0], beginLine[1])
                                                    ctx.lineTo(beginLine[0], beginLine[1]-minFlag)

                                                    var maxWidth = Math.max(data[y].width,data[i].width)
                                                    ctx.lineTo(beginLine[0]- maxWidth/2-minFlag, beginLine[1]-minFlag)
                                                    ctx.lineTo(beginLine[0]- maxWidth/2-minFlag, beginLine[1]+data[y].y-data[i].y-minFlag)
                                                   
                                                    ctx.lineTo(endLine[0],  beginLine[1]+data[y].y-data[i].y-minFlag)
                                                    ctx.lineTo(endLine[0], endLine[1])
                                                    ctx.stroke()
                                                    ctx.closePath();

                                                }
                                                
                                            }
                                       }

                                       else if(data[i].x>=data[y].x+data[y].width/2){
                                            if(data[i].y<data[y].y){
                                                beginLine = [data[i].x+ data[i].width/2, data[i].y]
                                                endLine = [data[y].x+ data[y].width/2, data[y].y]
                                                ctx.beginPath();

                                                ctx.strokeStyle = data[i].line[j].lineColor
                                                ctx.moveTo(beginLine[0], beginLine[1])
                                                ctx.lineTo(beginLine[0], beginLine[1]-minFlag)

                                                var maxWidth = Math.max(data[y].width,data[i].width)
                                                ctx.lineTo(data[y].x+ data[y].width/2, beginLine[1]-minFlag)
                                               
                                                ctx.lineTo(endLine[0], endLine[1])
                                                ctx.stroke()
                                                
                                                ctx.closePath();
                                               
                                            }
                                            else{
                                                if( data[i].x+data[i].width/2>=data[y].x+data[y].width){

                                                    beginLine = [data[i].x+ data[i].width/2, data[i].y]
                                                    endLine = [data[y].x+ data[y].width/2, data[y].y]
                                                    ctx.beginPath();

                                                    ctx.strokeStyle = data[i].line[j].lineColor
                                                    ctx.moveTo(beginLine[0], beginLine[1])
                                              
                                                    var maxWidth = Math.max(data[y].width,data[i].width)
                                                    ctx.lineTo(beginLine[0], beginLine[1]+data[y].y-data[i].y-minFlag)
                                              

                                                    ctx.lineTo(endLine[0],  beginLine[1]+data[y].y-data[i].y-minFlag)
                                                    ctx.lineTo(endLine[0], endLine[1])
                                                    ctx.stroke()
                                                    ctx.closePath();

                                                    

                                                   
                                                }
                                                else{
                                                    beginLine = [data[i].x+ data[i].width/2, data[i].y]
                                                    endLine = [data[y].x+ data[y].width/2, data[y].y]
                                                    ctx.beginPath();

                                                    ctx.strokeStyle = data[i].line[j].lineColor
                                                    ctx.moveTo(beginLine[0], beginLine[1])
                                                    ctx.lineTo(beginLine[0], beginLine[1]-minFlag)

                                                    var maxWidth = Math.max(data[y].width,data[i].width)
                                                    ctx.lineTo(beginLine[0]+ maxWidth/2+minFlag, beginLine[1]-minFlag)
                                                    ctx.lineTo(beginLine[0]+ maxWidth/2+minFlag, beginLine[1]+data[y].y-data[i].y-minFlag)

                                                    
                                                    ctx.lineTo(endLine[0],  beginLine[1]+data[y].y-data[i].y-minFlag)
                                                    ctx.lineTo(endLine[0], endLine[1])
                                                    ctx.stroke()
                                                    ctx.closePath();

                                                }
                                                
                                            }

                                       }
                                      
                                       break;
                                       case 2:
                                            if(data[i].x+data[i].width/2<=data[y].x+data[y].width/2){
                                                beginLine = [data[i].x+ data[i].width/2, data[i].y]
                                                endLine = [data[y].x+ data[y].width, data[y].y+data[y].height/2]
                                                ctx.beginPath();

                                                ctx.strokeStyle = data[i].line[j].lineColor
                                                ctx.moveTo(beginLine[0], beginLine[1])
                                                ctx.lineTo(beginLine[0], beginLine[1]-minFlag)

                                                var maxWidth = Math.max(data[y].width,data[i].width)
                                                ctx.lineTo(endLine[0]+minFlag, beginLine[1]-minFlag)
                                                // ctx.lineTo(beginLine[0]+ maxWidth/2+minFlag, beginLine[1]+data[y].y-data[i].y-minFlag)


                                                ctx.lineTo(endLine[0]+minFlag,  endLine[1])
                                                ctx.lineTo(endLine[0], endLine[1])
                                                ctx.stroke()
                                                ctx.closePath();
                                            
                                                
                                            }

                                            else{
                                                if(data[i].y<data[y].y){
                                                    beginLine = [data[i].x+ data[i].width/2, data[i].y]
                                                    endLine = [data[y].x+ data[y].width, data[y].y+data[y].height/2]
                                                    ctx.beginPath();

                                                    ctx.strokeStyle = data[i].line[j].lineColor
                                                    ctx.moveTo(beginLine[0], beginLine[1])
                                                    ctx.lineTo(beginLine[0], beginLine[1]-minFlag)

                                                    var maxWidth = Math.max(data[y].width,data[i].width)
                                                    ctx.lineTo(data[i].x+ maxWidth+minFlag, beginLine[1]-minFlag)


                                                    ctx.lineTo(data[i].x+ maxWidth+minFlag,  endLine[1])
                                                    ctx.lineTo(endLine[0], endLine[1])
                                                    ctx.stroke()
                                                    ctx.closePath();
                                                }
                                                else{
                                                    if(data[i].x+data[i].width/2>=data[y].x+data[y].width){
                                                        beginLine = [data[i].x+ data[i].width/2, data[i].y]
                                                        endLine = [data[y].x+ data[y].width, data[y].y+data[y].height/2]
                                                        ctx.beginPath();

                                                        ctx.strokeStyle = data[i].line[j].lineColor
                                                        ctx.moveTo(beginLine[0], beginLine[1])

                                                        var maxWidth = Math.max(data[y].width,data[i].width)
                                                        ctx.lineTo(beginLine[0],  endLine[1])


                                                        ctx.lineTo(beginLine[0],  endLine[1])
                                                        ctx.lineTo(endLine[0], endLine[1])
                                                        ctx.stroke()
                                                        ctx.closePath();
                                                    }
                                                    else{
                                                        beginLine = [data[i].x+ data[i].width/2, data[i].y]
                                                        endLine = [data[y].x+ data[y].width, data[y].y+data[y].height/2]
                                                        ctx.beginPath();

                                                        ctx.strokeStyle = data[i].line[j].lineColor
                                                        ctx.moveTo(beginLine[0], beginLine[1])
                                                        ctx.lineTo(beginLine[0], beginLine[1]-minFlag)

                                                        var maxWidth = Math.max(data[y].width,data[i].width)
                                                        ctx.lineTo(beginLine[0]+ maxWidth/2+minFlag, beginLine[1]-minFlag)


                                                        ctx.lineTo(beginLine[0]+ maxWidth/2+minFlag,  endLine[1])
                                                        ctx.lineTo(endLine[0], endLine[1])
                                                        ctx.stroke()
                                                        ctx.closePath();
                                                    }
                                                    
                                                }
                                                

                                            }
                                       break;
                                       case 3:
                                       
                                       if(data[i].x+data[i].width/2<=data[y].x+data[y].width/2){


                                           if(data[i].y<data[y].y){
                                                beginLine = [data[i].x+ data[i].width/2, data[i].y]
                                                endLine = [data[y].x, data[y].y+data[y].height/2]
                                                ctx.beginPath();

                                                ctx.strokeStyle = data[i].line[j].lineColor
                                                ctx.moveTo(beginLine[0], beginLine[1])
                                                ctx.lineTo(beginLine[0], beginLine[1]-minFlag)

                                                var minWidth = Math.min(data[y].x,data[i].x)
                                                ctx.lineTo(minWidth-minFlag, beginLine[1]-minFlag)


                                                ctx.lineTo(minWidth-minFlag,  endLine[1])
                                                ctx.lineTo(endLine[0], endLine[1])
                                                ctx.stroke()
                                                ctx.closePath();
                                           }
                                           else{
                                               if(data[i].x+data[i].width/2<=data[y].x){
                                                beginLine = [data[i].x+ data[i].width/2, data[i].y]
                                                endLine = [data[y].x, data[y].y+data[y].height/2]
                                                ctx.beginPath();

                                                ctx.strokeStyle = data[i].line[j].lineColor
                                                ctx.moveTo(beginLine[0], beginLine[1])
                                                ctx.lineTo(beginLine[0], beginLine[1]-minFlag)

                                                var minWidth = Math.min(data[y].x,data[i].x)
                                                //ctx.lineTo(minWidth-minFlag, beginLine[1]-minFlag)


                                                ctx.lineTo(beginLine[0],  endLine[1])
                                                ctx.lineTo(endLine[0], endLine[1])
                                                ctx.stroke()
                                                ctx.closePath();
                                               }
                                               else{
                                                beginLine = [data[i].x+ data[i].width/2, data[i].y]
                                                endLine = [data[y].x, data[y].y+data[y].height/2]
                                                ctx.beginPath();

                                                ctx.strokeStyle = data[i].line[j].lineColor
                                                ctx.moveTo(beginLine[0], beginLine[1])
                                                ctx.lineTo(beginLine[0], beginLine[1]-minFlag)

                                                var minWidth = Math.min(data[y].x,data[i].x)
                                                ctx.lineTo(minWidth-minFlag, beginLine[1]-minFlag)


                                                ctx.lineTo(minWidth-minFlag,  endLine[1])
                                                ctx.lineTo(endLine[0], endLine[1])
                                                ctx.stroke()
                                                ctx.closePath();
                                               }
                                                
                                           }
                                            

                                       }
                                       else{
                                            beginLine = [data[i].x+ data[i].width/2, data[i].y]
                                            endLine = [data[y].x, data[y].y+data[y].height/2]
                                            ctx.beginPath();

                                            ctx.strokeStyle = data[i].line[j].lineColor
                                            ctx.moveTo(beginLine[0], beginLine[1])
                                            ctx.lineTo(beginLine[0], beginLine[1]-minFlag)

                                            var minWidth = Math.min(data[y].x,data[i].x)
                                            ctx.lineTo(minWidth-minFlag, beginLine[1]-minFlag)


                                            ctx.lineTo(minWidth-minFlag,  endLine[1])
                                            ctx.lineTo(endLine[0], endLine[1])
                                            ctx.stroke()
                                            ctx.closePath();
                                       }
                                       break;
                                       case 4:
                                       
                                       break;
                                   }
                               }
                                
                            //}
                        }
                    }
                    

                }

            }


        },
        clickCanvas(data) {
            var moveCanvas = document.getElementById("myCanvas1");
            var ctx = moveCanvas.getContext("2d");
            moveCanvas.onclick = (ev) => {
                var e = ev || event;
                var x = e.clientX;
                var y = e.clientY;
                let eleOffsetLeft = moveCanvas.offsetLeft;
                let eleOffsetTop = moveCanvas.offsetTop;
                for (let i = 0; i < data.length; i++) {
                    this.allData[i].checked = false;
                }
                for (let i = 0; i < data.length; i++) {
                    let offtX = x - eleOffsetLeft - data[i].x;
                    let offtY = y - eleOffsetTop - data[i].y;

                    //x-eleOffsetLeft-arg[i].x<=200&&x-eleOffsetLeft-arg[i].x>=0&&y-eleOffsetTop-arg[i].y>=0&&y-eleOffsetTop-arg[i].y<=100
                    if (x - eleOffsetLeft - data[i].x <= data[i].width && x - eleOffsetLeft - data[i].x >= 0 && y - eleOffsetTop - data[i].y >= 0 && y - eleOffsetTop - data[i].y <= data[i].height) {
                        this.allData[i].checked = true;
                        ctx.clearRect(0, 0, moveCanvas.width, moveCanvas.height);
                        this.initCanvas(this.allData);
                        return;
                    }
                    else {
                        this.allData[i].checked = false;
                        ctx.clearRect(0, 0, moveCanvas.width, moveCanvas.height);
                        this.initCanvas(this.allData);
                    }
                }

            }
            //鼠标按下，将鼠标按下坐标保存在x,y中  


            moveCanvas.onmousedown = (ev) => {
                var e = ev || event;
                var x = e.clientX;
                var y = e.clientY;
                let eleOffsetLeft = moveCanvas.offsetLeft;
                let eleOffsetTop = moveCanvas.offsetTop;

                for (let i = 0; i < data.length; i++) {
                    let contX = x - eleOffsetLeft - data[i].x;
                    let contY = y - eleOffsetTop - data[i].y;

                    if (contX <= data[i].width && contX >= 0 && contY >= 0 && contY <= data[i].height) {
                        if (contX <= data[i].width && contX >= data[i].width - 8 && contY <= data[i].height && contY >= data[i].height - 8) {
                            console.log('位置:' + i)
                            this.scaleRightBottom(x, y, ctx, moveCanvas, i, ...data);
                        }
                        else if (contX <= data[i].width && contX >= data[i].width - 8 && contY <= 8 && contY >= 0) {
                            console.log('位置:' + i)
                            this.scaleRightTop(x, y, ctx, moveCanvas, i, ...data);
                        }
                        else if (contX <= 8 && contX >= 0 && contY <= 8 && contY >= 0) {
                            this.scaleLeftTop(x, y, ctx, moveCanvas, i, ...data);
                        }
                        else if (contX <= 8 && contX >= 0 && contY <= data[i].height && contY >= data[i].height - 8) {
                            this.scaleLeftBottom(x, y, ctx, moveCanvas, i, ...data);
                        }
                        else {
                            console.log("gggg")
                            this.drag(x, y, ctx, moveCanvas, i, ...data);
                        }
                        return;
                    }
                }

            };
            moveCanvas.ondblclick = (ev) => {
                for (let i = 0; i < this.allData.length; i++) {
                    if (this.allData[i].checked) {
                        console.log(this.allData[i])
                    }
                }

            }
        },
        dbclickCanvas(ele) {

        },
        moveCanvas(ele) {

        },
        scaleLeftBottom(x, y, ctx, ele, i, ...arg) {
            let eleOffsetLeft = ele.offsetLeft;
            let eleOffsetTop = ele.offsetTop;
            let offtX = x - eleOffsetLeft - arg[i].x;
            let offtY = y - eleOffsetTop - arg[i].y;
            let fx = this.allData[i].width - offtX;
            let fy = this.allData[i].height - offtY;
            let absoY = arg[i].y;
            let absoX = arg[i].x;
            let absoH = arg[i].height;
            let absoW = arg[i].width;
            let RX = arg[i].x + arg[i].width;
            let RY = arg[i].y + arg[i].height;
            ele.onmousemove = (ev) => {
                var e = ev || event;
                var ax = e.clientX;
                var ay = e.clientY;

                //鼠标移动每一帧都清楚画布内容，然后重新画圆  
                ctx.clearRect(0, 0, ele.width, ele.height);

                console.log("left-bottom")
                this.allData[i].x = absoX + ax - x;

                this.allData[i].width = absoW + x - ax;
                this.allData[i].height = absoH + ay - y;

                // 判断元素是否太小               

                if (this.allData[i].width < this.limit.width) {

                    this.allData[i].width = this.limit.width
                    this.allData[i].x = RX - this.limit.width;

                }
                if (this.allData[i].height < this.limit.height) {
                    this.allData[i].height = this.limit.height
                    this.allData[i].y = RY - this.limit.height;

                }
                this.allData[i].checked = true;
                this.initCanvas(this.allData);



            };
            //鼠标移开事件  
            ele.onmouseup = (ev) => {
                ctx.clearRect(0, 0, ele.width, ele.height);
                this.allData[i].checked = false;
                this.initCanvas(this.allData);
                this.trimData()
                ele.onmousemove = null;
                ele.onmouseup = null;
            };
        },
        scaleLeftTop(x, y, ctx, ele, i, ...arg) {
            let eleOffsetLeft = ele.offsetLeft;
            let eleOffsetTop = ele.offsetTop;
            let offtX = x - eleOffsetLeft - arg[i].x;
            let offtY = y - eleOffsetTop - arg[i].y;
            let fx = this.allData[i].width - offtX;
            let fy = this.allData[i].height - offtY;
            let absoY = arg[i].y;
            let absoX = arg[i].x;
            let absoH = arg[i].height;
            let absoW = arg[i].width;

            let RX = arg[i].x + arg[i].width;
            let RY = arg[i].y + arg[i].height;
            ele.onmousemove = (ev) => {
                var e = ev || event;
                var ax = e.clientX;
                var ay = e.clientY;

                //鼠标移动每一帧都清楚画布内容，然后重新画圆  
                ctx.clearRect(0, 0, ele.width, ele.height);

                console.log("left-top")


                this.allData[i].x = absoX + ax - x;
                this.allData[i].y = absoY + ay - y;

                this.allData[i].width = absoW + x - ax;
                this.allData[i].height = absoH + y - ay;



                // 判断元素是否太小               

                if (this.allData[i].width < this.limit.width) {

                    this.allData[i].width = this.limit.width
                    this.allData[i].x = RX - this.limit.width;

                }
                if (this.allData[i].height < this.limit.height) {
                    this.allData[i].height = this.limit.height
                    this.allData[i].y = RY - this.limit.height;

                }

                this.allData[i].checked = true;
                this.initCanvas(this.allData);

            };
            //鼠标移开事件  
            ele.onmouseup = (ev) => {
                ctx.clearRect(0, 0, ele.width, ele.height);
                this.allData[i].checked = false;
                this.initCanvas(this.allData);
                this.trimData()
                ele.onmousemove = null;
                ele.onmouseup = null;
            };
        },
        scaleRightTop(x, y, ctx, ele, i, ...arg) {
            let eleOffsetLeft = ele.offsetLeft;
            let eleOffsetTop = ele.offsetTop;
            let offtX = x - eleOffsetLeft - arg[i].x;
            let offtY = y - eleOffsetTop - arg[i].y;
            let fx = this.allData[i].width - offtX;
            let fy = this.allData[i].height - offtY;
            let absoY = arg[i].y;
            let absoH = arg[i].height;
            let absoW = arg[i].width;
            let LX = arg[i].x;
            let LY = arg[i].y;
            ele.onmousemove = (ev) => {
                var e = ev || event;
                var ax = e.clientX;
                var ay = e.clientY;

                //鼠标移动每一帧都清楚画布内容，然后重新画圆  
                ctx.clearRect(0, 0, ele.width, ele.height);

                console.log("right-top")


                this.allData[i].y = absoY + ay - y;

                this.allData[i].width = absoW + ax - x;
                this.allData[i].height = absoH + y - ay;
                // 判断元素是否太小               

                if (this.allData[i].width < this.limit.width) {

                    this.allData[i].width = this.limit.width
                    this.allData[i].x = LX;

                }
                if (this.allData[i].height < this.limit.height) {
                    this.allData[i].height = this.limit.height
                    this.allData[i].y = LY;

                }

                this.allData[i].checked = true;
                this.initCanvas(this.allData);

            };
            //鼠标移开事件  
            ele.onmouseup = (ev) => {
                ctx.clearRect(0, 0, ele.width, ele.height);
                this.allData[i].checked = false;
                this.initCanvas(this.allData);
                this.trimData()
                ele.onmousemove = null;
                ele.onmouseup = null;
            };
        },
        scaleRightBottom(x, y, ctx, ele, i, ...arg) {
            let eleOffsetLeft = ele.offsetLeft;
            let eleOffsetTop = ele.offsetTop;
            let offtX = x - eleOffsetLeft - arg[i].x;
            let offtY = y - eleOffsetTop - arg[i].y;
            let fx = this.allData[i].width - offtX;
            let fy = this.allData[i].height - offtY;
            ele.onmousemove = (ev) => {
                var e = ev || event;
                var ax = e.clientX;
                var ay = e.clientY;
                let contX2 = ax - eleOffsetLeft - arg[i].x;
                let contY2 = ay - eleOffsetTop - arg[i].y;

                //鼠标移动每一帧都清楚画布内容，然后重新画圆  
                ctx.clearRect(0, 0, ele.width, ele.height);

                console.log("right-bottom")
                this.allData[i].width = contX2 + fx;
                this.allData[i].height = contY2 + fy;

                // 判断元素是否太小               

                if (this.allData[i].width < this.limit.width) {
                    this.allData[i].width = this.limit.width
                }
                if (this.allData[i].height < this.limit.height) {
                    this.allData[i].height = this.limit.height

                }

                this.allData[i].checked = true;
                this.initCanvas(this.allData);

            };
            //鼠标移开事件  
            ele.onmouseup = (ev) => {
                ctx.clearRect(0, 0, ele.width, ele.height);
                this.allData[i].checked = false;
                this.initCanvas(this.allData);
                this.trimData()
                ele.onmousemove = null;
                ele.onmouseup = null;
            };
        },
        //拖拽函数  
        drag(x, y, ctx, ele, i, ...arg) {
            let eleOffsetLeft = ele.offsetLeft;
            let eleOffsetTop = ele.offsetTop;
            let offtX = x - eleOffsetLeft - arg[i].x;
            let offtY = y - eleOffsetTop - arg[i].y;
            ele.onmousemove = (ev) => {
                var e = ev || event;
                var ax = e.clientX;
                var ay = e.clientY;
                let contX2 = ax - eleOffsetLeft - arg[i].x;
                let contY2 = ay - eleOffsetTop - arg[i].y;

                //鼠标移动每一帧都清楚画布内容，然后重新画圆  
                ctx.clearRect(0, 0, ele.width, ele.height);

                this.allData[i].x = ax - eleOffsetLeft - offtX;
                this.allData[i].y = ay - eleOffsetTop - offtY;




                this.allData[i].checked = true;
                this.initCanvas(this.allData);

            };
            //鼠标移开事件  
            ele.onmouseup = (ev) => {
                ctx.clearRect(0, 0, ele.width, ele.height);
                this.allData[i].checked = false;
                this.initCanvas(this.allData);
                this.trimData()
                ele.onmousemove = null;
                ele.onmouseup = null;
            };


        },
        menuChildMove(){
            var element = document.getElementById('menuChild');
            var ele = document.getElementById('myCanvas1')
            element.onmousedown=(ev)=>{
                var e = ev || event;
                var x = e.clientX;
                var y = e.clientY;
                element.onmousemove = (ev) => {
                   
                    console.log('新增')
                element.onmouseup = (ev) => {
                    var e = ev || event;
                    var ax = e.clientX;
                    var ay = e.clientY;
                    let contX2 = ax - ele.offsetLeft;
                    let contY2 = ay - ele.offsetTop;
                    
                    this.allData.push({
                        x: contX2,
                        y: contX2,
                        text: "新增",
                        width: 100,
                        height: 100,
                        checked: false,
                        id: 10,
                        line: [
                        //     {
                        //     to: 1,
                        //     lineColor:"yellow",
                        //     pointId: [1, 1],//1,2,3,4连接点位置，上右下左,[from,to]
                        //     lineId: 1
                        // }
                        ]
                    },)
                    this.initCanvas(this.allData);
                    this.trimData()
                    element.onmousemove = null;
                    element.onmouseup = null;
                };

            };
            }
        }
    },
    mounted() {
        this.trimData()
        this.initCanvas(this.allData)
        this.clickCanvas(this.allData)
        this.menuChildMove()
    }

})
