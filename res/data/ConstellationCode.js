/*
 * Copyright (c) 2014-2016. JarkimZhu
 * This software can not be used privately without permission
 */

'use strict';

/**
 * @author JarkimZhu
 * Created on 2016-06-30.
 * @version 0.1.0
 */
const ConstellationCode = [
    {name:"水瓶座", match:(x)=>120 <= x && x <= 218, icon:require('../../res/horsoscope/shuiping.png'), style:{width:22.5,height:12.5}},
    {name:"双鱼座", match:(x)=>219 <= x && x <= 320, icon:require('../../res/horsoscope/shuangyu.png'), style:{width:22.5,height:18}},
    {name:"白羊座", match:(x)=>321 <= x && x <= 419, icon:require('../../res/horsoscope/baiyang.png'), style:{width:22.5,height:20.5}},
    {name:"金牛座", match:(x)=>420 <= x && x <= 520, icon:require('../../res/horsoscope/jinniu.png'), style:{width:18.5,height:19.5}},
    {name:"双子座", match:(x)=>521 <= x && x <= 621, icon:require('../../res/horsoscope/shuangzi.png'), style:{width:21.5,height:17.5}},
    {name:"巨蟹座", match:(x)=>622 <= x && x <= 722, icon:require('../../res/horsoscope/juxie.png'), style:{width:22.5,height:22}},
    {name:"狮子座", match:(x)=>723 <= x && x <= 822, icon:require('../../res/horsoscope/shizi.png'), style:{width:22.5,height:20}},
    {name:"处女座", match:(x)=>823 <= x && x <= 922, icon:require('../../res/horsoscope/chunv.png'), style:{width:22.5,height:16}},
    {name:"天秤座", match:(x)=>923 <= x && x <= 1023, icon:require('../../res/horsoscope/tianping.png'), style:{width:22.5,height:17.5}},
    {name:"天蝎座", match:(x)=>1024 <= x && x <= 1122, icon:require('../../res/horsoscope/tianxie.png'), style:{width:25.5,height:16}},
    {name:"射手座", match:(x)=>1123 <= x && x <= 1221, icon:require('../../res/horsoscope/sheshou.png'),style:{width:19.5,height:20}},
    {name:"魔蝎座", match:(x)=>(1222 >= x && x <= 1231) || (x >= 101 && x <= 119), icon:require('../../res/horsoscope/moxie.png'),style:{width:22.5,height:17.5}}
];

export default ConstellationCode;