# 电报Telegram红包扫雷机器人部署说明：该套代码为java代码，后台代码使用的是VUE。以下为部署服务器流程

🔥 媒体关注🔥

电报频道  : https://t.me/yishellmeta 

电报客服  : https://t.me/PacService 

电报客服  : https://t.me/eBayService 

电报群组  : https://t.me/eBayMetaDev  

推特频道  : https://twitter.com/eBayMeta 

源码频道  : https://github.com/eBayMeta 

油管频道  : https://www.youtube.com/@eBayMeta

### 1.服务器系统选择
      最好选用 ubuntu 系统，版本无所谓。

### 2.安装java环境 

      sudo apt update
      sudo apt install openjdk-11-jdk
      java -version
  
### 3.安装redis

      sudo apt install redis-server
  

### 4.启动机器人：

      进入到运行包目录使用 nohub java -jar xxx.jar & 就启动了 
      
### 5.查看启动日志 

      使用 tail -f nohub.log 
      看是否启动成功,如果启动成功，则退出查看日志界面使用命令 control + c 就可以退出。

### 6.更换机器人
      如果需要更换机器人。需要把之前的启动进程杀掉
<img width="565" alt="image" src="https://user-images.githubusercontent.com/124488076/219601217-3821bfe2-cd2c-476c-bd8c-55864a9cc648.png">
      1.使用查看启动进程命令： ps -ef | grep java 
<img width="1001" alt="image" src="https://user-images.githubusercontent.com/124488076/219601887-294c3cb0-04bf-4d78-884f-0f0950b3f4bd.png">
      2.在数据库中config表里吗更改机器人名字 跟token
      3.然后重新启动机器人即可，进入到运行包目录使用 nohub java -jar xxx.jar & 就启动了 


# 机器人玩法说明：
        1.发包玩家发包的格式为：发+金额+雷号 
          比如要发50U雷号设置为4则直接在娱乐群中发送 ：发50-4 
          注意：发包时 发包玩家账户余额必须要大于要发的金额
          
        2.抢包玩家抢包的方式为：直接点击领取按钮就可以参与抢包
          注意：抢包时 抢包玩家账户余额必须要是抢的发包金额的1.8倍 这个后台可以进行修改
          
        3.中雷规则 ： 
            抢包玩家抢到红包金额最后一位数字如果和发包玩家设定的雷值相同 则 判断为中雷 
            抢包玩家就相当于输了 需要向发包玩家赔付1.8倍 
            发包玩家就相当于赢了 发包玩家赢的金额基础上，平台会抽取5%的抽水费用 
            
            抢包玩家抢到红包金额最后一位数字如果和发包玩家设定的雷值不同 则 判断为未中雷
            抢包玩家就相当于赢了 抢包玩家白领取【赢了】的金额基础上，平台会抽取5%的抽水费用
            发包玩家就相当于输了  
            
        4.推广返利
            私聊机器人点击个人中心按钮会要推广链接信息等
            每个玩家都有自己专属的推广链接。推广下线的时候只需要复制链接发送给要推广的人就可以
            返利规则：
              发包玩家赢的情况（有抢包玩家中雷）在所赢的金额基础上 平台抽取 %5 的抽水费用里面的 35% 会实时返现给发包玩家的上级推广人。
              抢包玩家赢的情况（领取金额没中雷）中所领取金额基础上 平台抽取 %5 的抽水费用里面的 35% 会实时返现给抢包玩家的上级推广人。
              
              
        5.平台发送福利包：
            福利包设定是为了激励群里的玩家积极参与游戏，福利包通过后台设定可以发送福利包的人 和 每次发送的金额。
            由发生福利包的人不定期的做群里发送 【福利】 两个字供玩家抢。
            
           
           
           
# 机器人后台说明：
     1.用户管理： 
            展示所有玩家用户信息。以及玩家的推广详情。可以通过 【增加】 【减少】 按钮手动给玩家上分下分。
     2.自动抢包：
            这里的自动抢包需要设定 10个以上的自动抢包的人，添加自动抢包前端显示的用户，只需要做用户列表里面复制用户ID，然后回到自动抢包菜单中
            点击添加，粘贴用户ID即可，群组可以点击下拉框随便选择。
     3.全局流水：
            展示所有玩家抢包、发包、上下分的流水详情
     4.充值地址：
            该功能为自动充值相关，自动充值是跟交易所一样，每个玩家系统都会分配一个专属的充值地址。
            玩家在获取充值地址的后，所有玩家的充值地址都会在这个菜单列表里面展示
     5.提币地址：
            该功能为自动提币相关。该功能暂未开通！
     6.发包订单：
            展示所以发包玩家都订单信息。以及每个包都领取详情
     7.授权群组：
            机器人在群里正常运营的时候需要进行群组授权，如果不授权在该群里面的机器人无法正常工作。
            授权群组过程： 
              1.将机器人拉入群后设置成管理员
              2.在群里发送【获取群信息】然后机器人会获取到该群的ID 
              3.复制该ID在后台授权群组菜单中进行添加，群名称随便写。是否开启选择YES
     8.系统配置
              1.红包封面链接：替换发包的时候所显示的封面图片
              2.玩法介绍链接：发包开奖后底下【玩法介绍】按钮点击跳转的链接，一般为自建频道。
              3.联系客服链接：发包开奖后底下【联系客服】按钮点击跳转的链接，一般为客服私人号。
              4.个人中心链接：发包开奖后底下【个人中心】按钮点击跳转的链接，必须是机器人链接。点击直接跳转机器人私聊管理界面
              5.进群游戏链接：在机器人私聊管理界面有个进群游戏，可以设定游戏群组链接，玩家点击直接进入玩法群组中
              6.红包过期时间：玩家所发的包，会有个时间限定。以秒为单位。如果配置60秒则代表1分钟
                            如果1分钟内，所发的红包没有人抢 或者 没有抢完，则系统会自动退回剩余金额给发包入
              7.玩家发包赔率：默认1.8倍 意思就是比如 发包玩家发100U的包 如果有抢包玩家中雷，则抢包玩家需要给发包玩家赔付 180U 。
              
              8.发包人手续费：这个是 平台收取发包人的 抽水费用。
                            例如：如果发包人赢了 180U 那么手续费计算为： 
                                 180 乘 【发包人手续费】 = 平台抽水费用 
                                 180 减 平台抽水的费用 就是发包入实际赢的金额
                                 
              9.领包人手续费：这个是 平台收取领包人的 抽水费用。
                            例如：如果领包人赢了 20U 那么手续费计算为：
                                 20 乘 【领包人手续费】 = 平台抽水费用 
                                 20 减  平台抽水的费用 就是领包入实际赢的金额  
            
              10.推广人费用：这个是 奖励给推广人的费用 。 请参考玩法说明推广规则。此处不在赘述！
              
              11.最小发包数量：就是发红包小于此处配置的数量的话，机器人不让发包。
                        
              12.最大发包数量：就是发红包大于此处配置的数量的话，机器人不让发包。 
              
              13. 小顺子 大顺子 小豹子 大豹子奖励：
                  针对于抢包玩家，如果抢包玩家所领取的红包金额符合以上，则平台会进行额外的奖励。
                  举例：抢包玩家领取的金额规则如以下
                  A. 1.23即为小顺   【3位顺子】
                  B. 1.11即为小豹   【3位豹子】
                  C. 12.34即为大顺  【4位顺子】
                  D. 11.11即为大豹  【4位豹子】
                  
              14.领取次数： 代表发包玩家发的包可以被几个人领取 ， 一般设置 5包 6包
              
              15.隐藏索引： 
                          为了防止有人可以猜到领取的金额，设置这个功能的话 前端会隐藏所领取的金额。
                          如果是5包 则隐藏索引的范围值必须是0-4 小于5
                          如果是6包 则隐藏索引的范围值必须是0-5 小于6 
                               
              16.发送福利包管理用户：
                       这里设置用户列表里的用户ID 设置里后就只有这个人才可以在群里发送福利包。
               
              17.发送福利包金额：
                       福利管理员中群里发送【福利】两字所发出包的金额
              18.开启自动抢包：
                       如果开启则进入自动抢包模式。玩家中群里发的包，机器人会进行自动抢包，
                       注意：如果开启这个功能，则必须要做自动抢包中配置10个以上自动抢包所显示的机器人。
              19.开启公证数字：
                       开启这个功能的话，就进入公正模式。目前公正值为 发包的当前时间做为公正值
                       
              20.中雷几率：
                       这个是控制抢包玩家的中雷几率的，范围值为 0-100 
                       0是肯定不会中雷    100是肯定会中雷
                       正常运营设置范围为8到12 这个可根据实际运营出雷几率进行调整
                       
                       
                                 
       9.单控用户 ： 
                控制单个用户是否中雷 或者 不中雷。
                中用户列表中挑选用户ID ，然后回到单控用户菜单，点击【添加】按钮进行添加
                添加时候选择YES代表 所设置用户必须中 NO代表所设置的用户必须不会中
              
          
          



















