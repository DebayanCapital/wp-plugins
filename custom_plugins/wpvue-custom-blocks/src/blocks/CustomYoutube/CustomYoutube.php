<?php
/**
 * CustomYoutube block.
 *
 * @package WPVue/Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * CustomYoutube class.
 */
class CustomYoutube extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'custom-youtube';

	/**
	 * Initiate class.
	 *
	 * @return Block Object
	 */
	public function __construct() {
		//parent::__construct();
	}

	/**
	 * Get block attributes.
	 *
	 * @return array
	 */
	protected function get_attributes() {
		return array_merge(
			parent::get_attributes(),
			array(
				'block_id'=> $this->get_schema_string(),
			)
		);
	}

	/**
	 * Render the block.
	 *
	 * @param array  $attributes Block attributes. Default empty array.
	 * @param string $content    Block content. Default empty string.
	 * @return string Rendered block type output.
	 */
	public function render( $attributes = array(), $content = '' ) {
		return '';
	}

	/**
	 * Render filtered Content for REST.
	 *
	 * @param string $content    Block content. Default empty string.
	 * @param array  $block Block array. Default empty array.
	 * @return array FilteredContent block type output.
	 */
	public function render_filtered_content( $content, $block ) {
		if( $block['blockName'] !== $this->namespace . '/' . $this->block_name ) return $content;

		$attributes = $block['attrs'];
		$url = ( isset( $attributes['youtube_url'] ) && $attributes['youtube_url'] ) ? $attributes['youtube_url'] : '';
		$thumbnail_type = ( isset( $attributes['thumbnail_type'] ) && $attributes['thumbnail_type'] ) ? $attributes['thumbnail_type'] : 'maxresdefault.jpg';
		$thumbnail_alt = ( isset( $attributes['thumbnail_alt'] ) && $attributes['thumbnail_alt'] ) ? $attributes['thumbnail_alt'] : '';
		$disable_fullscreen = ( isset( $attributes['disable_fullscreen'] ) ) ? $attributes['disable_fullscreen'] : false;
		$enable_related = ( isset( $attributes['enable_related'] ) ) ? $attributes['enable_related'] : false;
		$disable_autoplay = ( isset( $attributes['disable_autoplay'] ) && $attributes['disable_autoplay'] ) ? 0 : 1;
		$disable_fullscreen = ( $disable_fullscreen ) ? '' : 'allowfullscreen';
		$youtube_video_id = $this->get_youtube_video_id( $url );
		$WP_oEmbed = new WP_oEmbed();
		$get_data = $WP_oEmbed->get_data( $url );
		$thumbnail_img = '';
		$height = '281';
		$width = '500';
		if( $get_data ) {
			$width = $get_data->width;
			$height = $get_data->height;
			$thumbnail_parts = pathinfo( $get_data->thumbnail_url );
			//$thumbnail_img = str_replace( $thumbnail_parts['basename'], $thumbnail_type, $get_data->thumbnail_url );
			$thumbnail_img = $get_data->thumbnail_url;
			if( !$thumbnail_alt ) {
				$thumbnail_alt = $get_data->title;
			}
		}
		if( !$thumbnail_img )
			$thumbnail_img = 'https://i.ytimg.com/vi/'.$youtube_video_id.'/'.$thumbnail_type;
		
		$query_param = '?autoplay='.$disable_autoplay.'&rel=';
		$query_param .= ( $enable_related ) ? 1 : 0;
		$filtered_attributes = array(
			'block_id' => $attributes['block_id'],
			'youtube_url' => $url,
			'thumbnail_type' => $thumbnail_type,
			'thumbnail_alt' => $thumbnail_alt,
			'disable_fullscreen' => $disable_fullscreen,
			'enable_related' => $enable_related,
			'disable_autoplay' => $disable_autoplay,
			'height' => $height,
			'width' => $width
		);
		$embedded_youtube = '<section class="ut-video-section">
			    <div class="container">
			      <div class="ut-video-block">
			      <img class="youtube-thumb" src="'.$thumbnail_img.'" alt="'.$thumbnail_alt.'" />
			      <a class="youtube-overlay youtube-play" 
			      data-vid="'.$youtube_video_id.'" 
			      data-width="'.$width.'" 
			      data-height="'.$height.'" 
			      data-fullscreen="'.$disable_fullscreen.'" 
			      data-params="'.$query_param.'" 
			      >
			      <span class="m_yt_button">
			        <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
			          <path class="ytp-large-play-button-bg" d="m .66,37.62 c 0,0 .66,4.70 2.70,6.77 2.58,2.71 5.98,2.63 7.49,2.91 5.43,.52 23.10,.68 23.12,.68 .00,-1.3e-5 14.29,-0.02 23.81,-0.71 1.32,-0.15 4.22,-0.17 6.81,-2.89 2.03,-2.07 2.70,-6.77 2.70,-6.77 0,0 .67,-5.52 .67,-11.04 l 0,-5.17 c 0,-5.52 -0.67,-11.04 -0.67,-11.04 0,0 -0.66,-4.70 -2.70,-6.77 C 62.03,.86 59.13,.84 57.80,.69 48.28,0 34.00,0 34.00,0 33.97,0 19.69,0 10.18,.69 8.85,.84 5.95,.86 3.36,3.58 1.32,5.65 .66,10.35 .66,10.35 c 0,0 -0.55,4.50 -0.66,9.45 l 0,8.36 c .10,4.94 .66,9.45 .66,9.45 z" fill="#1f1f1e" fill-opacity="0.81"/><path d="m 26.96,13.67 18.37,9.62 -18.37,9.55 -0.00,-19.17 z" fill="#fff"/><path d="M 45.02,23.46 45.32,23.28 26.96,13.67 43.32,24.34 45.02,23.46 z" fill="#ccc"/>
			        </svg>
			      </span>
			      </a>
			    </div>
			    </div>
			  </section>';

		$filteredData = array(
			'filtered_attributes' => $filtered_attributes,
			'embedded_youtube' => $embedded_youtube,
			'get_data' => $get_data
		);
		return $filteredData;
		
	}

	public function get_youtube_video_id( $url ) {
		// http://youtu.be/dQw4w9WgXcQ
		// http://www.youtube.com/embed/dQw4w9WgXcQ
		// http://www.youtube.com/watch?v=dQw4w9WgXcQ
		// http://www.youtube.com/?v=dQw4w9WgXcQ
		// http://www.youtube.com/v/dQw4w9WgXcQ
		// http://www.youtube.com/e/dQw4w9WgXcQ
		// http://www.youtube.com/user/username#p/u/11/dQw4w9WgXcQ
		// http://www.youtube.com/sandalsResorts#p/c/54B8C800269D7C1B/0/dQw4w9WgXcQ
		// http://www.youtube.com/watch?feature=player_embedded&v=dQw4w9WgXcQ
		// http://www.youtube.com/?feature=player_embedded&v=dQw4w9WgXcQ

		// It also works on the youtube-nocookie.com URL with the same above options.
		// It will also pull the ID from the URL in an embed code (both iframe and object tags)
		preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $url, $match);
		return isset( $match[1] ) ? $match[1] : false;
	}
}