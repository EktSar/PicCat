import $ from 'jquery';
import Masonry from 'masonry-layout';
import jQueryBridget from 'jquery-bridget';
import imagesLoaded from 'imagesloaded';

jQueryBridget('masonry', Masonry, $);
jQueryBridget( 'imagesLoaded', imagesLoaded, $ );

const $container = $('.masonry-container');
console.log($container);

$container.imagesLoaded(() => {
  console.log('fff')

  $container.masonry({
    columnWidth: 200,
    itemSelector: '.item',
    // gutter: 10
  });
});