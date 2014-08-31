(function ($){
    /* wait for the page to be loaded */
    $(function(){
        var navbarHeight = $('#navbar').height();
        function filterPath(string) {
            return string
                .replace(/^\//,'')                            /* remove leading slash */
                .replace(/(index|default).[a-zA-Z]{3,4}$/,'') /* remove file.extension */
                .replace(/\/$/,'');                           /* remove trailing slash */
        }
        $('a[href*=#]').each(function() {
            $this = $(this);
            if ( filterPath(location.pathname) == filterPath(this.pathname)
                    && location.hostname == this.hostname
                    && this.hash.replace(/#/,'') 
               ) {
                var $targetId     = $(this.hash)
                  , targetName    = this.hash.slice(1)
                  , $targetAnchor = $('[name=' + targetName +']')
                  , $target = $targetId.length ? $targetId : 
                                $targetAnchor.length ? $targetAnchor : false;
                if ($target) {
                    var targetOffset = $target.offset().top - navbarHeight;
                    $this.click(function() {
                        $('html, body').animate({scrollTop: targetOffset}, 1000);
                        var d = document.createElement("div");
                        d.style.height = "101%";
                        d.style.overflow = "hidden";
                        document.body.appendChild(d);
                        window.scrollTo(0,targetOffset);
                        setTimeout(function() {
                            d.parentNode.removeChild(d);
                        }, 10);
                        window.location.hash = targetName
                        return false;
                    });
                }
            }
        });

    });
})(jQuery);
