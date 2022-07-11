jQuery(function($){


    if ($(window).width() > 1024) doDesktop()
    else doMobile()

    function doMobile(){
       
        $(".tns-scene2").hide()
        $(".tns-scene3").hide()
        $(".tns-scene4").hide()
        $(".tns-scene5").hide()

        $(".tns-scene-wrap .wp-block-button__link").css({
            "width" : "325px"
        })

        $(".tns-nav").on("mouseenter mouseleave touchstart touchend click", manageMobileEvent)

        function manageMobileEvent(e){
         
                switch (e.type){
                    case "mouseenter": case "touchstart" :
                        $(e.target).addClass("show-arrow")
                        break
                    case "mouseleave": case "touchend":
                        $(e.target).removeClass("show-arrow")
                        break
                    case "click":
                     //   handleMobileClick(e.target)
                        break;
                }
        

        }
    }

    

    function doDesktop(){
        var tnsActive = ".tns-scene1"
        var navActive
        $(document).ready(function(){
    
            addEventListeners() 
            
            if (typeof ScrollOut === "function") { 
                ScrollOut({
                    targets: ".tipalti-nav-slider-container",
                    onShown: function() {
                        $("#tns-nav-1").trigger("click");
                    },
                   once : true
                });
            }
           
    
        })
    
        function addEventListeners(){
    
           $(".tns-nav").on("mouseenter mouseleave touchstart touchend click", manageEvent)
           $("#tns-nav-1").trigger("click");
         
    
        }
    
        function manageEvent(e){
            switch (e.type){
                case "mouseenter": case "touchstart" :
                    $(e.target).addClass("show-arrow")
                    break
                case "mouseleave": case "touchend":
                    $(e.target).removeClass("show-arrow")
                    break
                case "click":
                    handleClicked(e.target)
                    break;
            }
        }
    
        function handleClicked(el){
            activate(el)
            $(tnsActive).animate({"left": -2000})
            let scene = $(el).data('scene') 
            tnsActive = ".tns-scene"+scene
            $(".tns-scene"+scene).animate({"left" : 0})
           
        }
    
        function activate(el){
            if (navActive) $(navActive).removeClass('active')
            navActive = el
            $(el).addClass('active')
        }
    

    }
   
}) 

jQuery(document).ready(function() {
    jQuery('.tipalti-nav-slider-mobile ul li').click(function() {
        
        // console.log(jQuery(this).find('.tipalti-nav-slider-header').hasClass('active-header'));
        if(jQuery(this).find('.tipalti-nav-slider-header').hasClass('active-header')){
            jQuery('.tipalti-nav-slider-header').removeClass('active-header');
            jQuery(this).find('.tipalti-nav-slider-header').removeClass('active-header');
        } else {
            jQuery('.tipalti-nav-slider-header').removeClass('active-header');
            jQuery(this).find('.tipalti-nav-slider-header').addClass('active-header');
        }
        jQuery(this).find('.tipalti-nav-slider-content').slideToggle('fast')
        jQuery(this).siblings().find('.tipalti-nav-slider-content:visible').slideUp('fast');
    });
});

