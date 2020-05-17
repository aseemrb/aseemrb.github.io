$(function() {
  if ($("#post-wrapper .post-content h1").length == 0 &&
      $("#post-wrapper .post-content h2").length == 0 &&
      $("#post-wrapper .post-content h3").length == 0 &&
      $("#post-wrapper .post-content h4").length == 0) {
    $("#toc-wrapper").addClass("unloaded");
  }
});
