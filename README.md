# 部署流程：该套代码为java代码 后台代码使用的是VUE

## 1.选择ubuntu系统 版本无所谓

# 2.安装java环境 

      sudo apt update
      sudo apt install openjdk-11-jdk
      java -version
  
# 3.安装redis

      sudo apt install redis-server
  
# 4.启动机器人：

      进入到运行包目录使用 nohub java -jar xxx.jar & 就启动了 

# 5.查看启动日志 

      使用 tail -f nohub.log 
      看是否启动成功,如果启动成功，则退出查看日志界面使用命令 control + c 就可以退出。

# 6.如果需要更换机器人。需要把之前的启动进程杀掉 

# 7.查看启动进程 ps -ef | grep java 
<img width="565" alt="image" src="https://user-images.githubusercontent.com/124488076/219601217-3821bfe2-cd2c-476c-bd8c-55864a9cc648.png">

# 8.在数据库中config表里吗更改机器人名字 跟token
<img width="1001" alt="image" src="https://user-images.githubusercontent.com/124488076/219601887-294c3cb0-04bf-4d78-884f-0f0950b3f4bd.png">

# 9.然后重新启动机器人即可
