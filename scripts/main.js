var DETAIL_IMAGE_SELECTOR = "[data-image-role=\"target\"]";
var DETAIL_TITLE_SELECTOR = "[data-image-role=\"title\"]";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role=\"trigger\"]";
var NEXT_IMAGE_SELECTOR = "[button-role=\"next\"]";
var PREVIOUS_IMAGE_SELECTOR = "[button-role=\"previous\"]";
var CLICKED_THUMBNAIL_INDEX = 0;

function setDetails(imageUrl, titleText) {
  "use strict";
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailsArray = [].slice.call(thumbnails);
  return thumbnailsArray;
}

function trackClickedThumbnailIndexHandler(index){
  "use strict";
  return function(){
    CLICKED_THUMBNAIL_INDEX = index;
  };
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);

  for(var i=0; i < thumbnails.length; i++){
    thumbnails[i].addEventListener("click", trackClickedThumbnailIndexHandler(i));
  }

  var nextButton = document.querySelector(NEXT_IMAGE_SELECTOR);
  nextButton.addEventListener("click", function() {
    scrollDetailImageNext();
  });

  var previousButton = document.querySelector(PREVIOUS_IMAGE_SELECTOR);
  previousButton.addEventListener("click", function() {
    scrollDetailImagePrevious();
  });
}

function scrollDetailImageNext() {
  "use strict";
  var thumbnails = getThumbnailsArray();

  CLICKED_THUMBNAIL_INDEX++;
  if (CLICKED_THUMBNAIL_INDEX < thumbnails.length) {
    setDetailsFromThumb(thumbnails[CLICKED_THUMBNAIL_INDEX]);
  } else {
    CLICKED_THUMBNAIL_INDEX = 0;
    setDetailsFromThumb(thumbnails[CLICKED_THUMBNAIL_INDEX]);
  }
}

function scrollDetailImagePrevious() {
  "use strict";
  var thumbnails = getThumbnailsArray();

  if (CLICKED_THUMBNAIL_INDEX > 0) {
    CLICKED_THUMBNAIL_INDEX--;
  } else {
    CLICKED_THUMBNAIL_INDEX = thumbnails.length - 1;
  }
  setDetailsFromThumb(thumbnails[CLICKED_THUMBNAIL_INDEX]);
}

initializeEvents();
