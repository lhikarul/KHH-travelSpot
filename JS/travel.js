// get data
var xhr = new XMLHttpRequest();

xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);

xhr.send(null);

xhr.onload = function(){
    
    if (xhr.status == 200){
        var travelData = JSON.parse(xhr.responseText); 
    }else {
        alert('伺服器發生錯誤')
    }

    console.log(travelData)
    
    // 指定dom
    var area = document.querySelector('.area')
    var title = document.querySelector('.title')
    var popularArea = document.querySelector('.popular-area')   
    var travel_area = document.querySelector('.travelArea')



    // 監聽事件
    area.addEventListener('change',updateList,false);
    popularArea.addEventListener('click',updateList,false);
    



// 下拉式選單
    
    // 將travelData的所有地區儲存至zone陣列裡面。
    var zone = [];
    var len = travelData.result.records.length;
    for (i=0; i<len; i++){
    zone.push(travelData.result.records[i].Zone)   
    // console.log(travelData.result.records[i].Zone)
    };
   

  

    // 過濾地區，不要出現重複。
    var zoneList = [];
    zone.forEach(function(index){

        if (zoneList.indexOf(index) == -1){
            zoneList.push(index)
        }
    })
 
    
    //  下拉式選單完成
        var zoneList_len = zoneList.length;

        var str = '';

        for (i=0; i<zoneList_len; i++){

               
               var setNewArea = document.createElement('option');
               setNewArea.setAttribute('value',zoneList[i]);


               var setNewAreaText = document.createTextNode(zoneList[i]);   
               setNewArea.appendChild(setNewAreaText)

               area.children[0].appendChild(setNewArea)
        }
    
//更新內容
    function updateList(e){
        
        var select = e.target.value;
        var popular = e.target.textContent; 
        var travel_zone='';
        var travel_content = '';

        for (i=0; i<len; i++){
            
            if ( select == travelData.result.records[i].Zone || popular == travelData.result.records[i].Zone ){
                travel_zone=  travelData.result.records[i].Zone ;
                // console.log(travel_zone)
                               
                travel_content+= '<div class="travelSpot"><img src="' + travelData.result.records[i].Picture1 + '"><div class="spotName">'+travelData.result.records[i].Name + '<h5>'+travelData.result.records[i].Zone +'</h5></div>'
                                 +'<i class="icon-clock">'+travelData.result.records[i].Opentime+'</i><i class="icon-location">'+travelData.result.records[i].Add+'</i><div class="wrapper clearfix"><i class="icon-mobile">'+travelData.result.records[i].Tel+'</i>' 
                                 +'<i class="icon-tag">'+travelData.result.records[i].Ticketinfo+'</i></div><br />'+'<button class="infor">景點介紹</button><p class="description">'+travelData.result.records[i].Description+'</p></div>'                                
                // console.log(travel_content)                         
            }
        }
        title.innerHTML = travel_zone;
        travel_area.innerHTML = travel_content;

        var infor_btn = document.querySelectorAll('.infor')
        infor_btn.forEach((btn) => {
            btn.onclick = function(){
                console.log(this.nextElementSibling.style.display)
                if ( this.nextElementSibling.style.display == 'block'){
                     this.nextElementSibling.style.display = 'none'
                } else {
                    this.nextElementSibling.style.display = 'block'
                }
            }
        })
    }
}   


