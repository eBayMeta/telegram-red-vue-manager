<template>
  <div class="app-container">
    <el-form
      ref="ruleForm"
      :model="infoUpdateParams"
      label-position="left"
      label-width="140px"
      style="width: 400px; margin-left: 50px"
    >
      <el-form-item label="机器人编号" prop="botCode">
        <el-input
          v-model="infoUpdateParams.botCode"
          disabled
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="机器人名称" prop="botName">
        <el-input
          v-model="infoUpdateParams.botName"
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="机器人Token" prop="botToken">
        <el-input
          v-model="infoUpdateParams.botToken"
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="红包封面" prop="fengMianUrl">
        <el-input
          v-model="infoUpdateParams.fengMianUrl"
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="客服链接1" prop="kefuUrl">
        <el-input
          v-model="infoUpdateParams.kefuUrl"
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="频道链接1" prop="channelUrl">
        <el-input
          v-model="infoUpdateParams.channelUrl"
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="客服链接2" prop="kefuLingcaiUrl">
        <el-input
          v-model="infoUpdateParams.kefuLingcaiUrl"
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="频道链接2" prop="channeGonggaolUrl">
        <el-input
          v-model="infoUpdateParams.channeGonggaolUrl"
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="红包过期时间" prop="botAutoGetTime">
        <el-input
          v-model="infoUpdateParams.botAutoGetTime"
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="发包赔率" prop="receiveFee">
        <el-input
          v-model="infoUpdateParams.receiveFee"
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="发包人手续费" prop="bankerFee">
        <el-input
          v-model="infoUpdateParams.bankerFee"
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="领包人手续费" prop="playerFee">
        <el-input
          v-model="infoUpdateParams.playerFee"
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="推广人手续费" prop="pusherFee">
        <el-input
          v-model="infoUpdateParams.pusherFee"
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="最小发红包数量" prop="minSendAmount">
        <el-input
          v-model="infoUpdateParams.minSendAmount"
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="最大发红包数量" prop="maxSendAmount">
        <el-input
          v-model="infoUpdateParams.maxSendAmount"
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="领取次数" prop="canReceiveCount">
        <el-input
          v-model="infoUpdateParams.canReceiveCount"
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="隐藏索引" prop="hideReceiveIndex">
        <el-input
          v-model="infoUpdateParams.hideReceiveIndex"
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="开启自动抢包" prop="autoGetOrderEnable">
        <el-select
          v-model="infoUpdateParams.autoGetOrderEnable"
          placeholder="请选择"
          style="width: 500px"
        >
          <el-option label="yes" value="yes"> </el-option>
          <el-option label="no" value="no"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="推广返佣开关" prop="rechargePushFeeEnable">
        <el-select
          v-model="infoUpdateParams.rechargePushFeeEnable"
          placeholder="请选择"
          style="width: 500px"
        >
          <el-option label="yes" value="yes"> </el-option>
          <el-option label="no" value="no"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="充值兑换筹码" prop="rechargePushFee">
        <el-input
          v-model="infoUpdateParams.rechargePushFee"
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="中雷几率" prop="bombConfig">
        <el-input
          v-model="infoUpdateParams.bombConfig"
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>

      <el-form-item label="可发雷数量" prop="bombSendNumber">
        <el-input
          v-model="infoUpdateParams.bombSendNumber"
          style="width: 500px"
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="是否开启自动充值" prop="autoRpcTronEnable">
        <el-select
          v-model="infoUpdateParams.autoRpcTronEnable"
          placeholder="请选择"
          style="width: 500px"
        >
          <el-option label="yes" value="yes"> </el-option>
          <el-option label="no" value="no"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateConfigFuntion('ruleForm')">
          确认
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getConfig, updateConfig } from "@/api/user.js";

export default {
  name: "",
  data() {
    return {
      updateConfigVisible: false,
      infoUpdateParams: {
        botCode: "",
        botName: "",
        botToken: "",
        fengMianUrl: "",
        kefuUrl: "",
        channelUrl: "",
        kefuLingcaiUrl: "",
        channeGonggaolUrl: "",
        botAutoGetTime: "",
        receiveFee: "",
        bankerFee: "",
        playerFee: "",
        pusherFee: "",
        minSendAmount: "",
        maxSendAmount: "",
        canReceiveCount: "",
        hideReceiveIndex: "",
        autoGetOrderEnable: "",
        rechargePushFeeEnable: "",
        rechargePushFee: "",
        bombConfig: "",
        bombSendNumber: "",
        autoRpcTronEnable:''
      },
    };
  },
  created() {
    this.getList();
  },

  methods: {
    getList() {
      getConfig({}).then((res) => {
        Object.keys(this.infoUpdateParams).forEach((key) => {
          this.infoUpdateParams[key] = res.data[0][key];
        });
      });
    },

    //修改配置
    updateConfigFuntion(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateConfig(this.infoUpdateParams).then((res) => {
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.getList();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
