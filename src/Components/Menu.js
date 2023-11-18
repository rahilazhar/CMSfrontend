export const Menue = (userrole) => {

  console.log(userrole , 'userrole')

  return [
    // { title: "Dashboard", link: "/#" },
    // { title: "Pages", link: "/pages" },
    // { title: "Media", link: "/media", spacing: true },

    {
      title: "Dashboard",
      link: "/",
      hidden: userrole !== "0",

    },
    {
      title: "Add Case",
      link: "/addcase",
      // submenue: true,
      // submenueitems: [
      //   { title: "Add Staff", link: "/addstaff" },
      //   { title: "Staff List", link: "/stafflist" },
      //   { title: "Staff Menue Rights", link: "/menuerights" },
      //   { title: "Team Building", link: "/teambuilding" },
      // ],
    },
    {
      title: "View Cases",
      link: '/viewcases'
    },


    // { title: "Media", link: "/media", spacing: true },


    // { title: "Profile", link: "/profile", spacing: true },
    // { title: "Setting", link: "/setting" },
    // { title: "Logout", link: "/logout" },
  ];

}


export const urlapi = "http://localhost:8082"
// export const urlapi = "https://cms-vusq.onrender.com"
// 

