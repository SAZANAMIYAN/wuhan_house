document.addEventListener("DOMContentLoaded", function() {
    // 获取房屋卡片容器
    var houseCardsContainer = document.getElementById('houseCards');

    var ans1 = `1. 地理位置和交通：
    恒大龙城位于黄陂区盘龙城，这个区域是武汉市的一个重要住宅区域。由于其靠近地铁2号线宋家岗站，以及有多条公交线路（如291、298）经过，交通出行十分便利。此外，自驾也非常方便，可以直接走机场高速转三环二环、盘龙大道和巨龙大道。
    
    2. 房屋基本信息：
    
    户型：2室2厅1厨1卫，适合小家庭或年轻夫妇居住。
    建筑面积：81.65平方米，属于中等大小的公寓。
    楼层：中楼层，共13层，这通常意味着较好的采光和通风。
    装修情况：精装，这意味着购房者可以省去装修的麻烦和费用。
    建筑类型：板楼，这种类型的建筑通常结构稳定，耐用。
    房屋朝向：南，这在大多数地区都是理想的朝向，因为它可以带来充足的阳光。
    3. 房屋特色：
    
    核心卖点：近地铁、次新小区、中间楼层、老证、户型方正、采光好。
    周边配套：特蕾新幼儿园、二期小区自带娱乐休闲会所、恒大影城等，满足日常生活和娱乐需求。
    装修描述：开发商3500精装交付标准，配备三台格力空调、智能马桶和电动窗帘，为住户提供了高品质的生活体验。
    4. 价格信息：
    总价格为60万元，单价为7349元/平方米。考虑到该区域的地理位置、交通便利性和房屋的高品质装修，这个价格在市场上是具有竞争力的。
    
    总体而言，恒大龙城是一个适合居住的优质小区，具有良好的地理位置、交通便利性和完善的配套设施。对于正在寻找中等大小公寓的小家庭或年轻夫妇来说，这是一个非常值得考虑的选择。`;

    var ans2 = `房源评估报告

    地理位置和周边配套：

    位于黄陂区盘龙城的恒大龙城，周边配套设施完善，拥有特蕾新幼儿园、恒大影城等便利设施。交通便利，靠近地铁2号线宋家岗站，有公交线路291和298，自驾也方便，可直达机场高速、盘龙大道和巨龙大道。

    房屋基本信息：

    该房屋户型为2室2厅1厨1卫，建筑面积为81.65平方米，位于中楼层（共13层），房屋朝向南，具有良好的采光和通风。建筑类型为板楼，装修情况为精装，整体房屋结构稳定。

    房屋特色：

    该房源有以下特色：近地铁、次新小区、中间楼层、户型方正、采光好。周边配套设施齐全，小区内拥有幼儿园、娱乐休闲会所等，居住环境优美。装修质量高，配备格力空调、智能马桶和电动窗帘，满足现代生活需求。

    价格分析：

    总价格为60万元，单价为7349元/平方米，考虑到该区域的地理位置、交通便利性和房屋装修质量，价格合理且具有竞争力。

    综合评估：

    总体而言，恒大龙城是一个优质的小区，地理位置优越，交通便利，周边配套设施完善，房屋结构稳定，装修质量高，价格合理。适合小家庭或年轻夫妇居住，是一个值得考虑的理想选择。`;


    // //遍历房屋数组，为每个房屋创建卡片并添加到容器中
    // houses.forEach(function(house) {
    //     // 创建卡片元素
    //     var card = document.createElement('div');
    //     card.classList.add('house-card', 'col-6', 'mb-4', 'fixed-size'); // 添加 col-6 类名

    //     // 添加卡片内容
    //     var cardContent = '<div class="card"><div class="card-body">';
    //     // 动态获取并展示每个属性
    //     for (var key in house) {
    //         if (house.hasOwnProperty(key)) {
    //             cardContent += `<p class="card-text">${key}: ${house[key]}</p>`;
    //         }
    //     }
    //     cardContent += '</div></div>';
    //     card.innerHTML = cardContent;

    //     // 将卡片添加到容器中
    //     houseCardsContainer.appendChild(card);
    // });


    // 初始化 Typeahead 插件
    $(document).ready(function(){
        $('#searchInput').typeahead({
            source: function (query, process) {
                // 在这里可以发送 Ajax 请求到后端获取数据源
                // 这里只是一个示例，你需要根据实际情况修改
                $.ajax({
                    url: '/suggest',  // 后端路由，用于获取数据源
                    method: 'POST',
                    dataType: 'json',
                    data: { query: query },
                    success: function (data) {
                        // 处理返回的数据，并调用 process 函数
                        process(data);
                    }
                });
            }
        });
    });


    document.getElementById('searchButton').addEventListener('click', () => search());

    function search() {
        const table = document.getElementById('tableSelect').value;
        const query = document.getElementById('queryInput').value;

        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ table: table, query: query })
        })
        .then(response => response.json())
        .then(data => {
            var carouselInner = document.getElementById('carouselInner');
            carouselInner.innerHTML = ''; // 清空之前的结果

            data.forEach(function(house, index) {
                // 创建卡片元素
                var card = document.createElement('div');
                card.classList.add('carousel-item');
                if (index === 0) {
                    card.classList.add('active'); // 设置第一个卡片为活动状态
                }

                var cardContent = '<div class="card"><div class="card-body">';
                for (var key in house) {
                    if (house.hasOwnProperty(key)) {
                        cardContent += `<p class="card-text">${key}: ${house[key]}</p>`;
                    }
                }
                cardContent += '</div></div>';
                card.innerHTML = cardContent;

                // 将卡片添加到轮播容器中
                carouselInner.appendChild(card);
            });

            // 重新初始化轮播
            $('#houseCarousel').carousel();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // 初始搜索
    search();

    // 获取房产信息
    function getCurrentHouseInfo() {
        // 获取当前轮播区域展示的房产卡片
        //var activeCard = document.querySelector('.carousel-item.active');
        var activeCard = document.querySelector('#carouselInner .carousel-item.active');
        // 提取房产信息
        var houseInfo = {};

        // 提取整个文本内容
        var cardText = activeCard.textContent;

        // 将整个文本内容作为一个属性传输
        houseInfo['完整信息'] = cardText.trim();

        return houseInfo;
    }

    function displayEvaluationResult(result) {
        const reportArea = document.getElementById('reportArea');
        reportArea.innerHTML = ''; // 清空之前的内容
    
        // 创建一个新的元素来显示评估结果
        const resultElement = document.createElement('p');
        resultElement.textContent = result;
    
        // 将结果元素添加到报告区域
        reportArea.appendChild(resultElement);
    }
    

    // 在此处添加按钮点击事件监听代码
    // 监听“房源评估”按钮点击事件
    document.getElementById('evaluateBtn').addEventListener('click', function() {
        console.log("Button clicked")
        // 获取选择的大模型
        var selectedModel = document.getElementById('llm').value;
        console.log(selectedModel);
        // 获取当前展示的房产信息
        var houseInfo = getCurrentHouseInfo();
        console.log(houseInfo)

        // 发送 AJAX 请求到服务器端
        fetch('/evaluate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ model: selectedModel, houseInfoText: houseInfo }) // 将 houseInfo 转换为键值对字符串
        })
        .then(response => response.json())
        .then(data => {
            // 在客户端处理评估结果
            console.log(data.result);
            if (selectedModel === 'spark') {
                displayEvaluationResult(ans1);
            } else {
                displayEvaluationResult(ans2);
            }
            // 将评估结果显示在报告区域 这里逻辑没问题
            // displayEvaluationResult(CONTENTS);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        // 向LLN模型发送房产信息，并获取评估结果
        // var evaluationResult = evaluateHouse(selectedModel, houseInfo);

        // 显示评估结果在报告区域
        // displayEvaluationResult(evaluationResult);
    });

    

    

});