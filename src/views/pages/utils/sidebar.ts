// Sidebar
export const sidebar = () => {
  let isSidebarOpened = false;
  $(".sidebar_button").click(() => {
    if (isSidebarOpened) {
      $(".sidebar_content").removeClass("is_open");
      $(".sidebar_button").removeClass("is_open");
      $(".content").removeClass("is_sidebar_open");
      $;
    } else {
      $(".sidebar_content").addClass("is_open");
      $(".sidebar_button").addClass("is_open");
      $(".content").addClass("is_sidebar_open");
    }
    isSidebarOpened = !isSidebarOpened;
  });
};
