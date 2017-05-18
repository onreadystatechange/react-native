/**
 * Created by yjy on 16/8/6.
 */

import {CSS} from '../../src/view/CSS/CSS'

const Res_Common_Size = {
    ICON_LOCATION: {width: CSS.pixel(18), height: CSS.pixel(22)},
    ICON_STAR_FULL: {width: CSS.pixel(27), height: CSS.pixel(26)},
    ICON_STAR_HALF: {width: CSS.pixel(26), height: CSS.pixel(26)},
    ICON_STAR_EMPTY: {width: CSS.pixel(27), height: CSS.pixel(26)},
    ICON_CHECK_MARK: {width: CSS.pixel(28), height: CSS.pixel(25)},
    ICON_ARROW_BACK: {width: CSS.pixel(19), height: CSS.pixel(38)},
    ICON_ARROW_FORWARD: {width: CSS.pixel(15), height: CSS.pixel(29)},
    ICON_REPORT : {width: CSS.pixel(37), height: CSS.pixel(35)},
    ICON_TIP: {width: CSS.pixel(48), height: CSS.pixel(48)},
    ICON_DELETE: {width: CSS.pixel(32), height: CSS.pixel(34)},
    ICON_COMPANY_CERTIFICATION: {width: CSS.pixel(34), height: CSS.pixel(36)},
    ICON_SEARCH: {width: CSS.pixel(35), height: CSS.pixel(35)},
    ICON_CLOSE: {width: CSS.pixel(24), height: CSS.pixel(24)},
    ICON_TIME: {width: CSS.pixel(20), height: CSS.pixel(20)},
    ICON_CASH: {width: CSS.pixel(52), height: CSS.pixel(52)},
    ICON_ALI_PAY: {width: CSS.pixel(48), height: CSS.pixel(48)},
    ICON_LIST_EMPTY: {width: CSS.pixel(70), height: CSS.pixel(85)}
};

const Res_Crowdfunding_Size = {
    introduce: {width: CSS.pixel(30), height: CSS.pixel(35)},
    alreadyFund: {width: CSS.pixel(25), height: CSS.pixel(25)}
};

const Res_OffLineEvent_Size = {
    phone: {width: CSS.pixel(36), height: CSS.pixel(40)},
    peopleApplied: {width: CSS.pixel(26), height: CSS.pixel(22)},
    date: {width: CSS.pixel(25), height: CSS.pixel(25)},
    location: {width: CSS.pixel(22), height: CSS.pixel(25)},
    praise: {width: CSS.pixel(40), height: CSS.pixel(40)},
    praised: {width: CSS.pixel(40), height: CSS.pixel(40)},
    plus: {width: CSS.pixel(38), height: CSS.pixel(38)},
    minus: {width: CSS.pixel(38), height: CSS.pixel(38)}
};

const Res_OnLineEvent_Size = {
    introduce: {width: CSS.pixel(23), height: CSS.pixel(26)},
    shadow: {width: CSS.pixel(171), height: CSS.pixel(17)},
    date: {width: CSS.pixel(24), height: CSS.pixel(25)}
};

const Res_MyEvent_Size = {
    arrow_down: {width: CSS.pixel(18), height: CSS.pixel(10)},
    arrow_up: {width: CSS.pixel(18), height: CSS.pixel(10)},
    pad: {width: CSS.pixel(414), height: CSS.pixel(371)},
    QRPad: {width: CSS.width()-CSS.pixel(72), height: CSS.pixel(360)}
};

const Res_index_Size = {
    event: {width: CSS.pixel(56), height: CSS.pixel(54)},
    job: {width: CSS.pixel(58), height: CSS.pixel(54)},
    schedule: {width: CSS.pixel(48), height: CSS.pixel(54)},
    wallet: {width: CSS.pixel(52), height: CSS.pixel(53)}
};

const Res_Merchant_Size = {
    home: {width: CSS.pixel(40), height: CSS.pixel(38)},
    message: {width: CSS.pixel(38), height: CSS.pixel(38)},
    mine: {width: CSS.pixel(38), height: CSS.pixel(38)},
    job: {width: CSS.pixel(37), height: CSS.pixel(38)},
    publish: {width: CSS.pixel(88), height: CSS.pixel(78)},
    banner: {width: CSS.width(), height: CSS.width()*349/720},
    setting: {width: CSS.pixel(36), height: CSS.pixel(36)},
    suggestion: {width: CSS.pixel(32), height: CSS.pixel(33)},
    wallet: {width: CSS.pixel(33), height: CSS.pixel(33)},
    certification: {width: CSS.pixel(37), height: CSS.pixel(35)},
    notice: {width: CSS.pixel(80), height: CSS.pixel(80)},
    service: {width: CSS.pixel(80), height: CSS.pixel(80)},
    remind: {width: CSS.pixel(80), height: CSS.pixel(80)},
    system: {width: CSS.pixel(80), height: CSS.pixel(80)},
    manage: {width: CSS.pixel(100), height: CSS.pixel(100)},
    homeMessage:{width: CSS.pixel(41), height: CSS.pixel(46)},
    credit:{width:CSS.pixel(35),height: CSS.pixel(35)},
    minePage:{width: CSS.pixel(86),height: CSS.pixel(86)}
};

export  {Res_Common_Size, Res_Crowdfunding_Size, Res_OffLineEvent_Size, Res_MyEvent_Size, Res_index_Size, Res_OnLineEvent_Size, Res_Merchant_Size}