(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{120:function(o,e,n){n(143);var t=n(8),i=n(24),s=n(7),a=n(4),d=n(0),r=n(1),c=n(22),l=n(6),g=n(145),m=n(5),p="goodLookRespCache",h=["_goodlookHasExpand","_isExposed"];o.exports={props:["tagId","subscene","activeTabData"],template:n(146),components:{feeds:n(23)},data:function(){return{RmdEnum:m,view:{Bus:this.Bus,isCommentClosed:!1},tag:null,numberReddot:0,showNewUserGuide:!1,bottomLinks:null,currentCategory:""}},provide:function(){return{view:this.$data.view}},computed:{isInMyGoodLook:function(){return this.subscene==m.subscene.FROM_ASSISTANT||this.subscene==m.subscene.FROM_JUMP_BAR},isDirectRequest:function(){return!(this.isInMyGoodLook&&r.os.android)}},methods:{getBlocks:function(){return this.$refs.feeds&&this.$refs.feeds.blocks},getSearchId:function(){return this.$refs.feeds&&this.$refs.feeds.feeds.searchId||r.searchId},setNumberReddot:function(o,e){var n=this;if(!this.isInMyGoodLook&&this.$data.numberReddot!=o){o&&(this.isExposeMsgBox=!1,!e&&this.syncReddotContent());var t=d.getScrollTop();this.$nextTick(function(){d.setScrollTop(t)}),this.$data.numberReddot=o,this.$nextTick(function(){n.checkIfNeedExposeMsgBox()})}},checkIfNeedExposeMsgBox:function(){if(this.$data.numberReddot&&!this.isExposeMsgBox){var o=this.$refs.newMsg.getBoundingClientRect();if(o.top+o.height<0)return;a.report14791(24,"",this.getSearchId()),this.isExposeMsgBox=!0}},syncCommentInfo:function(o){var e=this;if(o.length){var n=o.map(function(o){var e=o.items;return e&&e.length&&e[0].docID});n.length&&g("GetDocInfo",{docIdList:n.join(",")}).then(function(o){var n=o.retCode,t=o.commResp;void 0!==n&&0!=n||(e.Bus.$emit("goodLookCommentReplace",t),e.Bus.$emit("blocksChanged",e.getBlocks()))})}},syncReddotContent:function(){var o=this;g("SyncMention").then(function(e){var n=e.retCode,t=e.commResp;void 0!==n&&0!=n||o.Bus.$emit("receiveGoodLookReddotContent",t)})},handleTabReddot:function(o){this.isInMyGoodLook||(o.contentReddot=parseInt(o.contentReddot),o.numberReddot=parseInt(o.numberReddot),o.numberReddot&&this.setNumberReddot(o.numberReddot),this.getBlocks()&&this.getBlocks().length&&(o.contentReddot&&this.Bus.$emit("autoDropLoad"),o.numberReddot&&this.syncReddotContent()))},setCache:function(o){if(!this.isInMyGoodLook&&o.json&&o.json.data){var e=d.deepClone(o.json.data.filter(function(o){return!o.foldTo}).slice(0,10));h.forEach(function(o){e.forEach(function(e){delete e[o],e.items.forEach(function(e){delete e[o]})})});var n=this.getBlocks();e.forEach(function(o){if(o.items.length&&o.items[0].docID){var e=o.items[0].docID;n.filter(function(o){return o.foldTo==e}).length||delete o._foldWording}});var t=Object.assign({},o,{isCache:!0,newQuery:!0,json:Object.assign({},o.json,{data:e})});this.goodLookRespCache=t,d.localStorage.setCache(p,JSON.stringify(t))}},setMyJumpBar:function(o){if(o&&o.length){var e=!1;o.forEach(function(o){var n=o.jumpBar||o._jumpBar;n&&(o._jumpBar=n,e?delete o.jumpBar:(e=!0,o.jumpBar=n))})}},clearNoPraisedBlock:function(){if(this.getBlocks()&&this.getBlocks().length){var o=this.getBlocks().length,e=this.getBlocks().filter(function(o){return!o.items.length||o.items[0].colikeInfo&&o.items[0].colikeInfo.userList.length});o!=e.length&&this.Bus.$emit("updateBlocks",e)}},setJumpBarBackData:function(o,e){this.jumpBarBackData&&(!this.jumpBarBackData[o]&&(this.jumpBarBackData[o]=[]),this.jumpBarBackData[o].push(e),localStorage.setItem("recommend:jump-bar-back-data",JSON.stringify(this.jumpBarBackData)))},notifyReddot:function(o){d.log("notifyReddot, ".concat(JSON.stringify(o)),"info"),this.isInMyGoodLook?this.setJumpBarBackData("notifyReddot",o):this.syncReddotContent()},notifyNumReddotChange:function(o){d.log("notifyNumReddotChange, ".concat(JSON.stringify(o)),"info"),this.isInMyGoodLook?this.setJumpBarBackData("notifyNumReddotChange",o):this.setNumberReddot(o.reddotNum)},onWebRecommendInfoUpdate:function(o){var e=this,n=o.params;d.log("onWebRecommendInfoUpdate, ".concat(n),"info");try{(n=JSON.parse(n)).docId?this.Bus.$emit("goodLookOutlinkChanged",n):g("UrlToDocid",{url:n.url}).then(function(o){var t=o.retCode,i=o.commResp;void 0!==t&&0!=t||(d.log("UrlToDocid, docId is ".concat(i.docId),"info"),n.docId=i.docId,e.Bus.$emit("goodLookOutlinkChanged",n))})}catch(o){d.log("onWebRecommendInfoUpdate parse error, data is ".concat(n))}this.isInMyGoodLook&&this.setJumpBarBackData("onWebRecommendInfoUpdate",o)},onWebRecommendNotifyReddotExtMsg:function(o){var e=o.params;d.log("onWebRecommendNotifyReddotExtMsg, ".concat(e),"info"),(e=e.split("|")).length<4||(this.Bus.$emit("goodLookCommentUpdate",{opType:""+e[0],docId:e[1],commentId:e[2],openId:e[3]}),this.isInMyGoodLook&&this.setJumpBarBackData("onWebRecommendNotifyReddotExtMsg",o))},afterGettingData:function(o){var e=o.resp,n=o.ret,t=o.blocks;if(a.reportIDKey(l.goodLookFetchPV),this.isInMyGoodLook)this.$data.tag||(this.$data.tag={name:r.extParams.tagName,desc:o.ret.subTitle||r.extParams.tagDesc||""});else{if(n.isNewUser&&0==n.ret&&!t.length&&!this.getBlocks().length)return this.$data.showNewUserGuide=!0,o;this.$data.showNewUserGuide=!1,this.$data.bottomLinks=(t.length<10||!n.continueFlag)&&void 0!==n.bottomLinks?n.bottomLinks:null,void 0!==n.showFirstGuideInColike&&(this.$data.view.showFirstGuideInColike=n.showFirstGuideInColike),void 0!==n.msgBoxJumpUrl&&(this.msgBoxJumpUrl=n.msgBoxJumpUrl),void 0!==n.msgBox&&(this.setNumberReddot(n.msgBox.msgCount||0,e.isCache),n.msgBox.jumpUrl&&(this.msgBoxJumpUrl=n.msgBox.jumpUrl)),!this.isAlreadyHandlerReddot&&this.activeTabData&&this.handleTabReddot(this.activeTabData.tab),this.isAlreadyHandlerReddot=!0,this.setMyJumpBar(t),e.isCache?(this.goodLookRespCache=e).newQuery&&this.syncCommentInfo(t):(o.error?(this.goodLookRespCache.json&&Object.assign(this.goodLookRespCache.json,{msgBox:n.msgBox}),this.setCache(this.goodLookRespCache)):(n.isNewUser&&(i.alert('<i class="icon-recommend"></i><p>你和朋友认为好看的内容<br>将出现在这里</p>',{buttons:[{label:"知道了",type:"primary"}],className:"good-look-new-user-guide-alert",isAndroid:!1}),delete n.isNewUser),this.setCache(e)),n.reddotTimestamp&&s.invoke("updateReddotTimeStamps",{reddotTimeStamps:n.reddotTimestamp}))}return void 0!==n.isCommentClosed&&(this.$data.view.isCommentClosed=n.isCommentClosed),o.blocks=t,o},onFeedsTouchmove:function(){a.report14791(6,this.tagId,this.getSearchId())},onTapNewMsg:function(o){this.msgBoxJumpUrl&&(this.Bus.$emit(m.events.onTapSearchItem),d.startSearchItemDetailPage({type:2,jumpUrl:d.addParamsToURLSearch("red_point_cnt=".concat(this.$data.numberReddot),this.msgBoxJumpUrl),position:0,clickType:1,scene:r.scene,sceneActionType:r.sceneActionType,query:r.query,isCurrentDetailPage:!r.isHomePage,publishId:["wrd",r.sessionId,this.getSearchId(),"notice"].join("#")}),this.setNumberReddot(0),g("GetSvrTs").then(function(o){var e=o.retCode,n=o.commResp;0==e&&(s.invoke("updateReddotTimeStamps",{reddotTimeStamps:n}),s.invoke("updateNumReddot",{latestTimeStamp:n}))}),this.goodLookRespCache.json.msgBox&&(this.goodLookRespCache.json.msgBox.msgCount=0),this.setCache(this.goodLookRespCache),a.reportIDKey(l.tapTopicMsg),a.report14791(25,"",this.getSearchId()))},onHoldNewMsg:function(){d.localStorage.removeItem(p),alert("已清除缓存")},onTapBottomLink:function(o){var e=navigator.userAgent.match(/\((.*?)\)/)||"";e&&(e=e[1]);var n=navigator.userAgent.match(/MicroMessenger\/([^\s]*)/)||"";n&&(n=n[1]),o=d.addParamsToURLSearch(d.object2params({version:r.queryString.wechatVersion||n,lang:r.lang,uin:r.uin,deviceName:r.queryString.deviceName||e,imei:r.queryString.imei||"",deviceBrand:r.queryString.deviceBrand||"",deviceModel:r.queryString.deviceModel||"",ostype:r.queryString.ostype||""}),o),d.openSearchWebView({actionType:m.openSearchWebView.actionType.LINK,jumpUrl:o,type:r.type,query:r.query,scene:r.scene,searchId:this.getSearchId(),tabPageType:m.openSearchWebView.tabPageType.RECOMMEND,tagId:this.tagId})}},beforeCreate:function(){this.Bus=new c("good-look"),this.isAlreadyHandlerReddot=!1,this.jumpBarBackData=null,this.msgBoxJumpUrl="",this.goodLookRespCache={}},created:function(){this.isExposeMsgBox=!1,this.isInMyGoodLook&&(this.jumpBarBackData={})},mounted:function(){var o=this,e=this;e.$nextTick(function(){s.on("notifyReddot",o.notifyReddot),s.on("notifyNumReddotChange",o.notifyNumReddotChange),s.on("onWebRecommendInfoUpdate",o.onWebRecommendInfoUpdate),s.on("onWebRecommendNotifyReddotExtMsg",o.onWebRecommendNotifyReddotExtMsg),s.on("onNavBarShadowManuallyHidden",function(e){o.Bus.$emit("onNavBarShadowManuallyHidden",e)}),r.Bus.$on(e,"activity:state_change",function(e){switch(e.state){case"onResume":if(o.isInMyGoodLook)return;var n=localStorage.getItem("recommend:jump-bar-back-data");if(n){n=JSON.parse(n);var t=function(e){var t=o[e];n[e].forEach(function(o){t(o)})};for(var i in n)t(i);localStorage.removeItem("recommend:jump-bar-back-data")}}}),r.Bus.$on(e,"onClientSwitchTag",function(e){o._inactive||(o.handleTabReddot(e.tab),o.getBlocks().length||o.Bus.$emit("getSearchData"))}),e.Bus.$on(e,"syncGoodLookCommentInfo",function(o){e.syncCommentInfo(o)}),e.Bus.$on(e,"droploadTrigger",function(){o.clearNoPraisedBlock()}),e.Bus.$on(e,"goodLookBlockChanged",function(e){if(t.nextTick(function(){e.updateCalcHeight()}),o.goodLookRespCache.json){var n=o.goodLookRespCache.json.data.findIndex(function(o){return o._blockId==e._blockId});if(n<0)return;o.goodLookRespCache.json.data[n]=e,o.setCache(o.goodLookRespCache)}}),e.Bus.$on(e,"blocksChanged",function(e){o.setMyJumpBar(e),o.goodLookRespCache.json&&(o.goodLookRespCache.json.data=e,o.setCache(o.goodLookRespCache))}),e.Bus.$on(e,"changeViewData",function(e){if(Object.assign(o.$data.view,e),o.goodLookRespCache.json){var n=!1;for(var t in e)void 0!==o.goodLookRespCache.json[t]&&(n=!0,o.goodLookRespCache.json[t]=e[t]);n&&o.setCache(o.goodLookRespCache)}}),e.Bus.$on(e,m.events.resultScrollEvent,e.checkIfNeedExposeMsgBox)})},beforeDestroy:function(){r.Bus.$offAll(this)}}},143:function(o,e,n){var t=n(144);"string"==typeof t&&(t=[[o.i,t,""]]),t.locals&&(o.exports=t.locals),(0,n(3).default)("3f82b232",t,!1,{})},144:function(o,e,n){(o.exports=n(2)(!1)).push([o.i,".good-look .refresh-bar {\n  color: #A8A8A8;\n  pointer-events: none;\n}\n.good-look .refresh-bar:before,\n.good-look .refresh-bar:after {\n  display: none;\n}\n.good-look .refresh-bar__inner {\n  position: relative;\n  display: inline-block;\n  padding: 0 12px;\n}\n.good-look .refresh-bar__inner:before,\n.good-look .refresh-bar__inner:after {\n  width: 56px;\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D8D8D8;\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n  transform: scaleY(0.5);\n  top: 11px;\n}\n.good-look .refresh-bar__inner:before {\n  left: auto;\n  right: 100%;\n}\n.good-look .refresh-bar__inner:after {\n  left: 100%;\n}\n.good-look .rmd-list {\n  top: -6px;\n}\n.good-look .rmd-block_good-look {\n  padding-top: 6px;\n}\n.good-look .rmd-block_good-look:before {\n  display: none;\n}\n.good-look .rmd-block_refresh-bar + .rmd-block_good-look {\n  padding-top: 0;\n}\n.good-look .rmd-article_single .rmd-article__title {\n  top: 0;\n}\n.good-look .rmd-article_single .rmd-article__img {\n  margin-left: 4.7%;\n  width: 22%;\n  padding-bottom: 22%;\n}\n.good-look .rmd-article_single .rmd-article__content {\n  padding-bottom: 28px;\n}\n.good-look .rmd-article__title {\n  font-weight: 500;\n}\n.good-look .page-tail-msg {\n  margin-bottom: 20px;\n  padding-bottom: 0;\n}\n.good-look_my-good-look .rmd-list {\n  margin-top: 0;\n}\n.good-look_my-good-look .rmd-block_good-look {\n  position: relative;\n  padding-top: 0;\n}\n.good-look_my-good-look .rmd-block_good-look:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #EBEBEB;\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n  transform: scaleY(0.5);\n  left: 16px;\n  z-index: 1;\n}\n.good-look_my-good-look .rmd-block_good-look:first-child:before {\n  display: none;\n}\n.good-look__hd {\n  position: relative;\n  z-index: 2;\n  -webkit-backface-visibility: visible;\n          backface-visibility: visible;\n  padding-top: 8px;\n  padding-bottom: 40px;\n  background-color: #F2F2F2;\n  text-align: center;\n}\n.good-look__hd h2 {\n  font-weight: 500;\n  font-size: 20px;\n  line-height: 1.4;\n}\n.good-look__router-view-enter-active,\n.good-look__router-view-leave-active {\n  -webkit-transition: opacity 0.15s;\n  transition: opacity 0.15s;\n}\n.good-look__router-view-enter,\n.good-look__router-view-leave-to {\n  opacity: 0;\n}\n.good-look-new-user-guide-alert .icon-recommend {\n  margin-bottom: 20px;\n  width: 23px;\n  height: 25px;\n  background-image: url(\"data:image/svg+xml;charset=UTF-8,%3csvg viewBox='0 0 16 18' width='16' height='18' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='#FFC300' d='M14.552 13.29l-2.354.635-.065-2.457c0-.018.035-.07.086-.108l2.128-1.198.64 2.391a.601.601 0 0 1-.435.737zm-6.125 3.578a.627.627 0 0 1-.844 0l-1.747-1.755 2.064-1.24.023-.001c.048 0 .082.01.112.026l2.12 1.22-1.728 1.75zM.992 12.554l.632-2.37 2.044 1.188c.003.003.055.046.055.121l.045 2.43-2.342-.63c-.333-.097-.524-.418-.434-.739zm.031-7.592a.61.61 0 0 1 .373-.287l2.356-.633-.047 2.412v.031l.001.032c.002.035-.006.057-.025.067l-.021.011-.022.012L1.62 7.794.971 5.406a.573.573 0 0 1 .052-.444zM7.552 1.11a.601.601 0 0 1 .855 0l1.723 1.735L7.974 4.09l-.055.024-2.1-1.263L7.552 1.11zm7.436 4.303l-.641 2.385-2.164-1.202a.163.163 0 0 1-.05-.113l.045-2.448 2.375.64a.6.6 0 0 1 .435.738zm-3.719 9.253l-.424-.245-2.367-1.36a1.188 1.188 0 0 0-.552-.14.966.966 0 0 0-.514.14l-2.265 1.36-.418.251-.058-3.179c0-.386-.201-.735-.527-.94L1.878 9.235l-.424-.246 2.664-1.566c.352-.184.553-.55.535-.951l.05-2.687.01-.493.418.253L7.392 4.91a.97.97 0 0 0 .527.151c.184 0 .37-.049.53-.151l2.796-1.618-.01.489-.05 2.691v.01c0 .392.218.757.539.941l2.37 1.317.426.237-.426.24-2.37 1.334a1.131 1.131 0 0 0-.538.941l.07 2.686.013.487zm4.635-2.356L15.2 9.682l-.027-.095-.163-.61.894-3.32a1.555 1.555 0 0 0-1.106-1.896l-2.6-.702-.471-.128-.235-.063-.168-.168-.345-.347L9.077.44c-.59-.59-1.618-.586-2.198.001L4.467 2.868l-.22.06-.081.022-3.016.81c-.407.11-.745.371-.951.736a1.51 1.51 0 0 0-.141 1.163l.715 2.632.047.174.144.526-.061.227-.039.147-.786 2.94c-.23.824.248 1.658 1.094 1.9l2.614.704.476.13.221.058 2.429 2.44a1.53 1.53 0 0 0 1.092.447c.417 0 .805-.159 1.095-.449l2.417-2.446.237-.063.442-.12 2.609-.702a1.551 1.551 0 0 0 1.1-1.894z'/%3e%3c/svg%3e\");\n}\n.good-look-new-user-guide-alert .weui-dialog__bd:first-child {\n  padding-top: 30px;\n}\n.good-look-new-user-guide-alert p {\n  line-height: 1.6;\n}\n.good-look__new-msg {\n  position: relative;\n  z-index: 101;\n  padding: 15px 0;\n  text-align: center;\n  background-color: #F2F2F2;\n}\n.good-look__new-msg-inner {\n  position: relative;\n  display: inline-block;\n  background-color: #FFFFFF;\n  padding: 4px 5px 4px 15px;\n  font-size: 14px;\n  border-radius: 2px;\n  line-height: 32px;\n}\n.good-look__new-msg-inner img {\n  margin-right: 8px;\n  width: 32px;\n  height: 32px;\n  border-radius: 4px;\n  overflow: hidden;\n  vertical-align: middle;\n}\n.good-look__new-msg-inner span,\n.good-look__new-msg-inner i {\n  vertical-align: middle;\n}\n.good-look__new-msg-inner:before {\n  content: \" \";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 200%;\n  height: 200%;\n  border: 1px solid #EBEBEB;\n  color: #EBEBEB;\n  box-sizing: border-box;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scale(0.5);\n          transform: scale(0.5);\n  border-radius: 4px;\n}\n.good-look__new-user-guide {\n  padding-top: 40px;\n  text-align: center;\n  font-size: 14px;\n}\n@media only screen and (min-height: 600px) {\n  .good-look__new-user-guide {\n    padding-top: 60px;\n  }\n}\n@media only screen and (min-height: 700px) {\n  .good-look__new-user-guide {\n    padding-top: 80px;\n  }\n}\n@media only screen and (min-height: 800px) {\n  .good-look__new-user-guide {\n    padding-top: 100px;\n  }\n}\n.good-look__new-user-guide .icon-recommend {\n  width: 23px;\n  height: 25px;\n}\n.good-look__new-user-guide h4 {\n  margin-top: 20px;\n  color: #7F7F7F;\n  font-weight: 500;\n}\n.good-look__new-user-guide p {\n  margin: 20px 0;\n  color: rgba(0, 0, 0, 0.3);\n}\n@media only screen and (min-height: 600px) {\n  .good-look__new-user-guide p {\n    margin: 30px 0;\n  }\n}\n.good-look__new-user-guide img {\n  width: 214px;\n}\n.good-look__bottom-links {\n  margin-top: 20px;\n  padding-bottom: 42px;\n  text-align: center;\n  color: #576B95;\n  font-size: 14px;\n}\n.good-look__bottom-links span {\n  display: inline-block;\n  vertical-align: middle;\n}\n.good-look__bottom-links span + span {\n  position: relative;\n  margin-left: 10px;\n  padding-left: 10px;\n}\n.good-look__bottom-links span + span:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 1px;\n  border-left: 1px solid #CCCCCC;\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0;\n  -webkit-transform: scaleX(0.5);\n  transform: scaleX(0.5);\n  top: 4px;\n  bottom: 4px;\n}\n.good-look__bottom-links_fixed {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 101;\n}\n",""])},145:function(o,e,n){var t=n(30),i=n(0),s=n(1),a=null;o.exports=function(o,e,n){return a||(a=new t("queryWebCommCgi","onWebRecommendCommCgiResult")),new Promise(function(t,d){e=i.object2params(Object.assign({cgi:o,h5Version:s.version},e),function(o){return o}),i.log("queryWebCommCgi ".concat(o,", args is: ").concat(e),"info"),a.send({commReq:e},n).then(function(e){if(e.commResp)try{i.log("".concat(o," receicve, commResp length ").concat(e.commResp.length),"info"),e.commResp=JSON.parse(e.commResp)}catch(n){i.log("".concat(o," commResp parse error! Data is: ").concat(e.commResp))}t(e)}).catch(d)})}},146:function(o,e){o.exports='<div class="good-look" :class="{\'good-look_my-good-look\': isInMyGoodLook}">\n    <div v-if="tag" class="good-look__hd">\n        <h2>{{tag.name}}</h2>\n        <p v-if="tag.desc">{{tag.desc}}</p>\n    </div>\n\n    <div class="good-look__bd"\n         v-on:touchmove.once="onFeedsTouchmove"\n         v-show="!showNewUserGuide"\n    >\n        \x3c!--未读消息--\x3e\n        <div ref="newMsg" v-if="numberReddot" class="good-look__new-msg" v-hold="{cb: onHoldNewMsg, opts: {duration: 1000}}">\n            <div class="good-look__new-msg-inner" @click.stop.prevent="onTapNewMsg">\n                <span>{{numberReddot}}条新消息</span>\n                <i class="icon-toggle icon-toggle_right"></i>\n            </div>\n        </div>\n        \x3c!--end of 未读消息--\x3e\n\n        \x3c!--feeds流--\x3e\n        <feeds\n                ref="feeds"\n\n                :tag-id="tagId"\n                :subscene="subscene"\n                :load-cache="!isInMyGoodLook ? \'goodLookRespCache\' : \'\'"\n                :is-direct-request="isDirectRequest"\n                :is-always-can-drop-load="true"\n\n                :after-getting-data="afterGettingData"\n        ></feeds>\n\n        <div v-if="bottomLinks" class="good-look__bottom-links" :class="{\'good-look__bottom-links_fixed\': !getBlocks().length}">\n            <span v-for="link in bottomLinks" @click="onTapBottomLink(link.url)">{{link.wording}}</span>\n        </div>\n    </div>\n\n    <div class="good-look__new-user-guide" v-show="showNewUserGuide">\n        <div>\n            <i class="icon-recommend"></i>\n        </div>\n        <h4>你和朋友认为好看的内容将出现在这里</h4>\n        <p>在文末轻触“好看”，<br>让朋友看到你推荐的内容。</p>\n        <img src="https://res.wx.qq.com/a/fed_upload/df5742e4-c0f7-41a7-b7bb-93f4b68a7d87/bg_new_user_guide.png" />\n    </div>\n</div>'}}]);