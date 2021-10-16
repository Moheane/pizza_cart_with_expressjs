module.exports = function cart() {
    var grandtotal =0;
    var smtotal=0;
    var mdtotal =0;
    var lgtotal = 0;
    var sqty = 0;
    var mqty = 0;
    var lqty = 0;
    var toogle = 'hide';
    var toogles = '';
    let orderlist = [];
    let payString ='pay';
    // var dis = '';


    function hide() {
        toogle = 'hide'

    }

    function hiderem() {
        toogle = ''

    }

    function showbtn() {
        toogles = 'hide'

    }

    function getshowbtn() {
        return toogles

    }
    function hideremv() {
        toogle = ''

    }
    function hidev() {
        
        return toogle

    }

    // function disabling() {
        
    //     dis = 'disabled'

    // }
    // function disablingv() {
        
    //     return dis

    // }


    function buymedium(a) {
        // mediump =0;
        // return mediump; 
        
    }
    function buylarge(a) {
        // largep =00;
        // return largep;
        
    }


    function stotal() {
        return smtotal
        
    }

    function mtotal() {
        return mdtotal
        
    }

    function ltotal() {
        return lgtotal
        
    }

    function gtotal() {
        return grandtotal
        
    }

    function smallqty() {
        return sqty
        
    }
    function mediumqty() {
        return mqty
        
    }
    function largeqty() {
        return lqty
        
    }
    

    
    function addsmall() {

            smtotal +=45;
            grandtotal +=45;
            sqty++;
        
        
        
    }


    function addmedium() {
        mdtotal +=68;
        grandtotal+=68;
        mqty++;
        
    }

    function addlarger() {
        lgtotal+=99;
        grandtotal+=99;
        lqty++;
        
    }
    function minussmall() {
        if (smtotal>0 || sqty>0) {
            smtotal-=45;
        grandtotal-=45;
        sqty--;
        }
        
        
    }
    function minusmedium() {
        if (mdtotal>0 || mqty>0) {
            mdtotal -=68;
        grandtotal-=68;
        mqty--;
        }
        
        
    }
    function minuslarger() {
        if (lgtotal>0 || lqty>0) {
            lgtotal-=99;
            grandtotal-=99;
            lqty--;
        }
 
        
    }
    function clearcart() {
        grandtotal =0;
        smtotal=0;
        mdtotal =0;
        lgtotal = 0;
        sqty = 0;
        mqty = 0;
        lqty = 0;
        
    }
    function orderregister() {
        // orderlist.push({
        //     id: 1,
        //     amount: gtotal(),
        //     status: 'pay'
        // })
        
    }

    function orderlisting() {
        return orderlist
    }

    function payingstring() {
        if (payString === '') {
            payString = 'pay'
        } else if (payString === 'pay') {
            payString = 'collect'
        }
        else if (payString === 'collect') {
            payString = ''
        }
    }

    function getpayingstring() {
        return payString
    }


 
    return{
        hide,
        hidev,
        hiderem,
        hideremv,
        // disabling,
        // disablingv,
        buymedium,
        buylarge,
        addsmall,
        addmedium,
        addlarger,
        minussmall,
        minusmedium,
        minuslarger,
        stotal,
        mtotal,
        ltotal,
        gtotal,
        smallqty,
        mediumqty,
        largeqty,
        clearcart,
        orderregister,
        orderlisting,
        payingstring,
        getpayingstring,
        showbtn,
        getshowbtn
    }
}