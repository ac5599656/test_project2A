$(document).ready(function() {
  function handleComment() {
    var currentPost = $(this)
      .parent()
      .parent();
    console.log(currentPost);
    var newTextbox = $("<textarea>");
    newTextbox.attr("id", "comment-body");
    var newSubmitButton = $("<button>");
    newSubmitButton.addClass("comment-submit btn btn-danger");
    newSubmitButton.text("Submit");
    newSubmitButton.attr("id", "commentSubmitButton");
    currentPost.append(newTextbox);
    currentPost.append(newSubmitButton);
    // $.ajax({
    //   method: "POST",
    //   url: "/api/comments"
    // }).then(function(data) {
    //   console.log(data);
    // console.log(data.firstname);
    // console.log(data.lastname);
    // console.log(data.User);
    // console.log(data.length);
    // var firstName = $("#firstNameDisplay");
    // var lastName = $("#lastNameDisplay");
    // firstName.text(`${data[data.length - 1].firstname}`);
    // lastName.text(`${data[data.length - 1].lasttname}`);
    // for (var i = 0; i < data.length; i++) {
    //   firstName = data[length - 1].firstname;
    //   lastName = data[length - 1].lasttname;
    //   firstName.text(`${data.firstname}`);
    //   lastName.text(`${data.lastname}`);
    // }
    // });
  }

  function plusComment(id, firstname, lastname, comment, create) {
    return `<div class="comment-card" data-comment-id="${id}">
            <div class="comment-author">${firstname} ${lastname}</div>
            <p>${comment}</p>
            <p><i>Posted on ${create}</i></p>
          </div> `;
  }

  $(document).on("click", "#commentSubmitButton", function(event) {
    event.preventDefault();

    var card = $(this).closest(".card");
    console.log(card);
    let postData = card.data().post;

    // console.log(postData.id);
    // create new post body with form content
    const newComment = {
      body: $("#comment-body")
        .val()
        .trim()
      // PostId: postData.id
    };
    console.log(newComment);
    // console.log(newComment.PostId);
    $.post("/api/comments", newComment, function(data) {
      //new comment coming from database
      console.log("new comment coming from database", data);

      var id = data.postId;
      var firstname = data.firstname;
      var lastname = data.lastname;
      var comment = data.comment;
      var create = data.create;
      var newCommentCardBody = plusComment(
        id,
        firstname,
        lastname,
        comment,
        create
      );

      $(newCommentCardBody).insertAfter(card.find(".card-body"));
    });
  });
  $(document).on("click", "button.addComment", handleComment);
});
