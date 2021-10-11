module.exports = function cart() {
    var grandtotal =0;
    var smtotal=0;
    var mdtotal =0;
    var lgtotal = 0;
    var sqty = 0;
    var mqty = 0;
    var lqty = 0;

    function buysmall(a) {

    }
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
    function minusmedium(a) {
        if (mdtotal>0 || mqty>0) {
            mdtotal -=68;
        grandtotal-=68;
        mqty--;
        }
        
        
    }
    function minuslarger(a) {
        if (lgtotal>0 || lqty>0) {
            lgtotal-=99;
            grandtotal-=99;
            lqty--;
        }
 
        
    }


 
    return{
        buysmall,
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
        largeqty
    }
}