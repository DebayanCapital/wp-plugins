<?php
add_action("init","load_dynamic_blocks");
function load_dynamic_blocks(){
	register_block_type('tipalti-custom-block/nav-slider', array(
    'render_callback' => 'tipalti_custom_nav_slider_func'
  ));
  register_block_type('tipalti-custom-block/nav-slider-2', array(
    'render_callback' => 'tipalti_custom_nav_slider2_func'
  ));
}
function tipalti_custom_nav_slider_func($attributes){
    //echo "<pre>";print_r($attributes);echo "</pre>";
    $block_path = '/blocks/NavSlider/';
	wp_enqueue_script( 'tipalti_navigation_slider_benefits_script', _get_plugin_url() . $block_path.'benefits.js', array('jquery'), false, true );
  // Parse attributes
  $items = $attributes['items'];
  $style = (isset($attributes['style']))?$attributes['style']:'';

  ob_start(); // Turn on output buffering

  /* BEGIN HTML OUTPUT */
?>
<style>
    .tipalti-nav-slider-container {
        margin: auto;
        display: grid;
    }

    .tns-panel-display{ 
        grid-row: 1;
    }

    .arrow {
        display: none;
        width: 9px;
        height: 22px;
        top: calc(50% - 11px);
        position: absolute;
        right: 0px;   
    }

    .tns-nav { 
        cursor: pointer; 
        border-bottom: 1px solid #cccccc;
        position: relative;
        line-height: 41px;
     }
     .tns-nav:first-child{
        border-top: 1px solid #cccccc;
     }

    .show-arrow, .active { color : #8CA7EB; }
    .show-arrow  img.arrow, .active img.arrow{ display: block;}

    .tipalti-nav-slider-mobile {
        display: none;
    }

    @media only screen and (max-width: 1024px) {
        .tipalti-nav-slider-mobile {
            display: block;
            margin: 0 -25px;
        }
        .tipalti-nav-slider-mobile ul {
            margin: 30px 0;
            padding: 0;
            list-style: none;
            
        }
        .tipalti-nav-slider-mobile ul li {
            list-style: none;
            margin: 0;
            padding: 0;
            border-top: 1px solid #cccccc;
        }

        .tipalti-nav-slider-mobile ul li:last-child {
            border-bottom: 1px solid #cccccc;
        }

        .tipalti-nav-slider-mobile .tipalti-nav-slider-header h4 {
            width: 85%;
            font-size: 18px;
            text-transform: uppercase;
            margin: 0;
            padding: 0 25px 0 0;
            position: relative;
        }

        .tipalti-nav-slider-header {
            padding: 15px 25px;
            margin: 0;
        }

        .tipalti-nav-slider-content {
            padding: 15px;
            display: none;
        }
        .tipalti-nav-slider-header.active-header {
            background: #000;
        }
        .tipalti-nav-slider-header.active-header h4 {
            color: #fff;
        }
        .tipalti-nav-slider-mobile .tipalti-nav-slider-header h4::after {
            content: '';
            height: 12px;
            width: 12px;
            border-bottom: 1px solid #000;
            position: absolute;
            right: -25px;
            top: 50%;
            border-left: 1px solid #000;
            margin-top: -6px;
            transform: rotate(-45deg);
        }
        .tipalti-nav-slider-header.active-header h4::after {
            transform: rotate(135deg);
            border-color: #fff;
        }
    }
    @media only screen and (max-width: 450px) {
        .tns-panel-nav { margin: 30px 0; }
        .tns-nav { padding: 10px 0; }

        
    }



@media only screen and (min-width: 1025px) {

    .tipalti-nav-slider-container {
        margin: auto;
        display: grid;
        grid-template-columns: repeat(12, 1fr);   
    }
  
    .tns-panel-display{ 
        grid-column: 7/span 6 ;
        min-height: 450px;
        overflow: auto;   
    }
    .tns-panel-nav { 
        grid-column: span 5 ;
        margin: 0px 0px 100px 0;  
    }
    .tns-panel-stage { position: relative;}
    .tns-scene, .tns-intro {
        position: absolute;
        top: 0;
        left: -2000px;
    }
    .tns-intro { left: 0 }
   
    .tns-nav { 
        padding: 19px 0 19px 20px; 
     }
    

}
</style>
 <div class="tipalti-nav-slider-container no-mobile no-tablet">
    <div class="tns-panel-nav">
		<?php for($i=0;$i<count($items);$i++){ ?>
        <div id="tns-nav-<?php echo $i+1; ?>" class="tns-nav" data-scene="<?php echo $i+1; ?>"><?php echo $items[$i]['nav_text']; ?>
            <img alt="arrow" class="arrow" src="<?php echo _get_plugin_url() . $block_path.'arrow.svg'; ?>" />
		</div>
		<?php } ?> 
    </div>
    <div class="tns-panel-display">
        <div class="tns-panel-stage">
			<?php for($i=0;$i<count($items);$i++){ ?>
            <div class="tns-scene tns-scene<?php echo $i+1; ?>">
                <div class="tns-scene-wrap">
                    <h2 class="has-largest-font-size"><?php echo $items[$i]['content_heading']; ?></h2>
                    <p class="tns-panel-display-text"><?php echo $items[$i]['content']; ?>
                    </p>
                    <div class="wp-block-button home-benefits-product">
                    <?php if(!empty($items[$i]['button_name'])){ ?>
                        <a class="wp-block-button__link" target="<?php echo (isset($items[$i]['target']) && $items[$i]['target']=="1")?'_blank':'_self'; ?>" href="<?php echo $items[$i]['button_url']; ?>"><?php echo $items[$i]['button_name']; ?></a>
                    <?php } ?>
                    </div>
                </div>
			</div>
			<?php } ?>
        </div>
    </div>
    
</div>
<div class="tipalti-nav-slider-mobile">
    <ul>
    <?php for($i=0;$i<count($items);$i++){ ?>
        <li>
            <div class="tipalti-nav-slider-header">
                <h4><?php echo $items[$i]['nav_text']; ?></h4>
            </div>
            <div class="tipalti-nav-slider-content">
                <h3><?php echo $items[$i]['content_heading']; ?></h3>
                <p><?php echo $items[$i]['content']; ?></p>
                <div class="wp-block-button">
                <?php if(!empty($items[$i]['button_name'])){ ?>
                    <a class="wp-block-button__link" target="<?php echo (isset($items[$i]['target']) && $items[$i]['target']=="1")?'_blank':'_self'; ?>" href="<?php echo $items[$i]['button_url']; ?>"><?php echo $items[$i]['button_name']; ?></a>
                <?php } ?>
                </div>
            </div>
        </li>
        <?php } ?> 
    </ul>
</div>
<?php
  /* END HTML OUTPUT */

  $output = ob_get_contents(); // collect output
  ob_end_clean(); // Turn off ouput buffer

  return $output; // Print output
}
function tipalti_custom_nav_slider2_func($attributes){
  $items = $attributes['info'];
  $style = (isset($attributes['style']))?$attributes['style']:'single_image_slider';
  if($style=='single_image_slider'){
    wp_enqueue_script( 'tipalti_navigation_slider2_benefits_script', get_stylesheet_directory_uri().'/lib/shortcodes/modular-blocks/contact-us/script.js', array('jquery'), false, true );
  // Parse attributes
  ob_start(); // Turn on output buffering
//echo "<pre>";print_r($attributes);echo "</pre>";
  /* BEGIN HTML OUTPUT */
  if($attributes['imgID']){
    $image_attributes = wp_get_attachment_image_src( $attributes['imgID'],'full' );
  }else{
    $image_attributes = '';
  }
?>
<div style="position: relative;">
    <div class="ti-timeline-block">
        <div class="ti-timeline-block-container">
            <div class="tl-image-wrap">
                <img class="bg-image" src="<?php echo ($image_attributes[0])?$image_attributes[0]:''; ?>" />
            </div>


  <div class="navigation">
    <div class="nav-arrow up"><img alt="Up" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNC4xMTEiIGhlaWdodD0iMTEuNzQyIiB2aWV3Qm94PSIwIDAgMjQuMTExIDExLjc0MiI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6bm9uZTtzdHJva2U6I2ZmYmMwMDtzdHJva2Utd2lkdGg6M3B4O308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iYSIgZD0iTTczMCwxODg4bDguNjU3LDExLjEzNUw3MzAsMTkxMC4yNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTkxMS4xOTEgLTcyOC44MTYpIHJvdGF0ZSg5MCkiLz48L3N2Zz4=" /></div>
    <div class="nav-arrow down"><img alt="Down" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNC4xMTEiIGhlaWdodD0iMTEuNzQyIiB2aWV3Qm94PSIwIDAgMjQuMTExIDExLjc0MiI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6bm9uZTtzdHJva2U6I2ZmYmMwMDtzdHJva2Utd2lkdGg6M3B4O308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iYSIgZD0iTTczMCwxODg4bDguNjU3LDExLjEzNUw3MzAsMTkxMC4yNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTkxMS4xOTEgLTcyOC44MTYpIHJvdGF0ZSg5MCkiLz48L3N2Zz4=" /></div>
  </div>
  <div class="sections">
      <div class="sections-wrap">
        <?php for($i=0;$i<count($items);$i++){ ?>
        <div class="section">
            <div class="wrap">
                <div class="year"></div>
                <div class="vline"></div>
                <div class="history">
                    <h2><?php echo $items[$i]['title']; ?></h2>
                    <?php echo $items[$i]['description']; ?>
                    <div class="wp-block-button mobile-full-width">
                        <a class="wp-block-button__link" target="<?php echo (isset($items[$i]['target']) && $items[$i]['target']=="1")?'_blank':'_self'; ?>" href="<?php echo $items[$i]['button_url']; ?>"><?php echo $items[$i]['button']; ?></a>
                    </div>
                    
                </div>
            </div>
        </div>
        <?php } ?>
    </div>
  </div>
 




  </div></div></div>
<?php
 $output = ob_get_contents(); // collect output
 ob_end_clean(); // Turn off ouput buffer
}else if($style=='multiple_image_slider'){
    wp_enqueue_script( 'tipalti_navigation_slider2_multi_img_slide_script', get_stylesheet_directory_uri().'/lib/shortcodes/modular-blocks/benefits-by-role/script.js', array('jquery'), false, true );
    // Parse attributes
    ob_start(); // Turn on output buffering
  //echo "<pre>";print_r($attributes);echo "</pre>";
    /* BEGIN HTML OUTPUT */
  ?>
  <style>
    @media screen {
	div#preloader {
		position: absolute;
		left: -9999px;
		top:  -9999px;
		}
	div#preloader img {
		display: block;
		}
	}
    @media print {
        div#preloader, 
        div#preloader img {
            visibility: hidden;
            display: none;
            }
	}
</style>

<div style="position: relative;">
    <div class="ti-timeline-block">
        <div class="ti-timeline-block-container">
            <div class="tl-image-wrap">
                <img class="bg-image" src="<?php echo $items[0]['imgUrl']; ?>"/>
            </div>


  <div class="navigation">
    <div class="nav-arrow up"><img alt="Up" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNC4xMTEiIGhlaWdodD0iMTEuNzQyIiB2aWV3Qm94PSIwIDAgMjQuMTExIDExLjc0MiI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6bm9uZTtzdHJva2U6I2ZmYmMwMDtzdHJva2Utd2lkdGg6M3B4O308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iYSIgZD0iTTczMCwxODg4bDguNjU3LDExLjEzNUw3MzAsMTkxMC4yNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTkxMS4xOTEgLTcyOC44MTYpIHJvdGF0ZSg5MCkiLz48L3N2Zz4=" /></div>
    <div class="nav-arrow down"><img alt="Down" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNC4xMTEiIGhlaWdodD0iMTEuNzQyIiB2aWV3Qm94PSIwIDAgMjQuMTExIDExLjc0MiI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6bm9uZTtzdHJva2U6I2ZmYmMwMDtzdHJva2Utd2lkdGg6M3B4O308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iYSIgZD0iTTczMCwxODg4bDguNjU3LDExLjEzNUw3MzAsMTkxMC4yNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTkxMS4xOTEgLTcyOC44MTYpIHJvdGF0ZSg5MCkiLz48L3N2Zz4=" /></div>
  </div>
  <div class="sections">
      <div class="sections-wrap">
    <?php for($i=0;$i<count($items);$i++){ ?>
        <div class="section">
            <div class="wrap">
                <div class="year"></div>
                <div class="vline"></div>
                <div class="history">
                    <h2><?php echo $items[$i]['title']; ?></h2>
                    <p><?php echo $items[$i]['description']; ?></p>
                </div>
            </div>
        </div>
    <?php } ?>

        <!-- <div class="section">
            <div class="wrap">
                <div class="year"></div>
                <div class="vline"></div>
                <div class="history">
                    <h2><?php echo $suppliers ?></h2>
                    <p><?php echo $suppliers_p1 ?></p>
                    <p class="bold"><?php echo $suppliers_p2 ?></p>
                    <ul>
                        <li><?php echo $suppliers_li1 ?></li>
                        <li><?php echo $suppliers_li2 ?></li>
                    </ul>
                    <p class="bold"><?php echo $suppliers_p3 ?></p>
                    <ul>
                        <li><?php echo $suppliers_li3 ?></li>
                        <li><?php echo $suppliers_li4 ?></li>
                    </ul>
                </div>
            </div>
        </div> -->

    </div>
  </div>
 




  </div></div></div>



  <div id="preloader">
  <?php for($i=0;$i<count($items);$i++){ ?>
    <img src="<?php echo $items[$i]['imgUrl']; ?>" />
  <?php } ?>
</div>
  <?php
   $output = ob_get_contents(); // collect output
   ob_end_clean(); // Turn off ouput buffer
}else if($style=='text_only'){
    wp_enqueue_script( 'tipalti_navigation_slider2_timeline_script', get_stylesheet_directory_uri().'/lib/shortcodes/modular-blocks/timeline/script.js', array('jquery'), false, true );
    // Parse attributes
    ob_start(); // Turn on output buffering
  //echo "<pre>";print_r($attributes);echo "</pre>";
    /* BEGIN HTML OUTPUT */
    if($attributes['imgID']){
        $image_attributes = wp_get_attachment_image_src( $attributes['imgID'],'full' );
      }else{
        $image_attributes = '';
      }
  ?>
  <div style="position: relative;">
    <div class="ti-timeline-block">
        <div class="ti-timeline-block-container">
            <div class="tl-image-wrap">
                <img class="bg-image" src="<?php echo ($image_attributes[0])?$image_attributes[0]:''; ?>"/>
            </div>


  <div class="navigation">
    <div class="nav-arrow up"><img alt="Up" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNC4xMTEiIGhlaWdodD0iMTEuNzQyIiB2aWV3Qm94PSIwIDAgMjQuMTExIDExLjc0MiI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6bm9uZTtzdHJva2U6I2ZmYmMwMDtzdHJva2Utd2lkdGg6M3B4O308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iYSIgZD0iTTczMCwxODg4bDguNjU3LDExLjEzNUw3MzAsMTkxMC4yNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTkxMS4xOTEgLTcyOC44MTYpIHJvdGF0ZSg5MCkiLz48L3N2Zz4=" /></div>
    <div class="nav-arrow down"><img alt="Down" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNC4xMTEiIGhlaWdodD0iMTEuNzQyIiB2aWV3Qm94PSIwIDAgMjQuMTExIDExLjc0MiI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6bm9uZTtzdHJva2U6I2ZmYmMwMDtzdHJva2Utd2lkdGg6M3B4O308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iYSIgZD0iTTczMCwxODg4bDguNjU3LDExLjEzNUw3MzAsMTkxMC4yNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTkxMS4xOTEgLTcyOC44MTYpIHJvdGF0ZSg5MCkiLz48L3N2Zz4=" /></div>
  </div>
  <div class="sections">
      <div class="sections-wrap">
      <?php for($i=0;$i<count($items);$i++){ ?>
        <div class="section">
            <div class="wrap">
                <div class="year has-huge-font-size"><?php echo $items[$i]['title']; ?></div>
                <div class="vline"></div>
                <div class="history"><p class="has-normal-font-size">
                    <?php echo $items[$i]['description']; ?>
                </p></div>
            </div>
        </div>
      <?php } ?>
        
    </div>
  </div>
 




  </div></div></div>
  <?php
   $output = ob_get_contents(); // collect output
   ob_end_clean(); // Turn off ouput buffer
}else if($style=='multiple_icon_slider'){
    wp_enqueue_script( 'tipalti_navigation_slider2_benefits_script', get_stylesheet_directory_uri().'/lib/shortcodes/modular-blocks/timeline/script.js', array('jquery'), false, true );
    // Parse attributes
    ob_start(); // Turn on output buffering
  //echo "<pre>";print_r($attributes);echo "</pre>";
    /* BEGIN HTML OUTPUT */
    if($attributes['imgID']){
        $image_attributes = wp_get_attachment_image_src( $attributes['imgID'],'full' );
      }else{
        $image_attributes = '';
      }
  ?>
  <div style="position: relative;" class="">
    <div class="ti-timeline-block">
        <div class="ti-timeline-block-container">
            <div class="tl-image-wrap">
                <img class="bg-image" src="<?php echo ($image_attributes[0])?$image_attributes[0]:''; ?>"/>
            </div>


  <div class="navigation">
    <div class="nav-arrow up"><img alt="Up" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNC4xMTEiIGhlaWdodD0iMTEuNzQyIiB2aWV3Qm94PSIwIDAgMjQuMTExIDExLjc0MiI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6bm9uZTtzdHJva2U6I2ZmYmMwMDtzdHJva2Utd2lkdGg6M3B4O308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iYSIgZD0iTTczMCwxODg4bDguNjU3LDExLjEzNUw3MzAsMTkxMC4yNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTkxMS4xOTEgLTcyOC44MTYpIHJvdGF0ZSg5MCkiLz48L3N2Zz4=" /></div>
    <div class="nav-arrow down"><img alt="Down" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNC4xMTEiIGhlaWdodD0iMTEuNzQyIiB2aWV3Qm94PSIwIDAgMjQuMTExIDExLjc0MiI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6bm9uZTtzdHJva2U6I2ZmYmMwMDtzdHJva2Utd2lkdGg6M3B4O308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iYSIgZD0iTTczMCwxODg4bDguNjU3LDExLjEzNUw3MzAsMTkxMC4yNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTkxMS4xOTEgLTcyOC44MTYpIHJvdGF0ZSg5MCkiLz48L3N2Zz4=" /></div>
  </div>
  <div class="sections">
      <div class="sections-wrap">
      <?php for($i=0;$i<count($items);$i++){ ?>  
        <div class="section" style="padding-left: 0;">
            <div class="wrap">
                <div class="title">
                    <picture>
                        <source media="(max-width: 850px)" srcset="<?php echo $items[$i]['imgUrl']; ?>">
                        <img style="max-width: 180px" src="<?php echo $items[$i]['imgUrl']; ?>"/>
                    </picture>
                    
                    <p class="quote-name"><?php echo $jason_wechsler ?></p>
                    <p class="quote-title has-small-font-size"><?php echo $items[$i]['title']; ?></p>
                </div>
                <div class="history">
                    <div class="has-large-font-size paddingBottom19 "><?php echo $items[$i]['description']; ?></div>
                    <div class="wp-block-button aligncenter mobile-full-width"><a class="wp-block-button__link" target="<?php echo (isset($items[$i]['target']) && $items[$i]['target']=="1")?'_blank':'_self'; ?>" href="<?php echo $items[$i]['button_url']; ?>"><?php echo $items[$i]['button']; ?></a></div>
                </div>
            </div>
        </div>
      <?php } ?>    
           


    </div>
  </div>
 




  </div></div></div>
  <?php
   $output = ob_get_contents(); // collect output
   ob_end_clean(); // Turn off ouput buffer
}
return $output; // Print output
}