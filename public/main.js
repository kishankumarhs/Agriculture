$(".movebuttonleft").click(function () {
  $(".newarraivals__holder").animate(
    {
      scrollLeft: "+=200px",
    },
    "slow"
  );
});
$("#left-button").click(function () {
  $(".newarraivals__holder").animate(
    {
      scrollLeft: "-=200px",
    },
    "slow"
  );
});
