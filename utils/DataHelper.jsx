import moment from "moment";

// Menu data
// export const menuItems = [
//   {
//     id: 1,
//     name: "Overview",
//     icon: "hugeicons:chart-bar-line",
//     path: "/",
//   },
//   {
//     id: 2,
//     name: "Network",
//     key: "network", // added
//     icon: "hugeicons:neural-network",
//     items: [
//       {
//         parentId: 2,
//         subId: 21,
//         subIcon: "duo-icons:approved",
//         subName: "Add Network",
//         subPath: "/network/add-network",
//       },
//       {
//         parentId: 2,
//         subId: 22,
//         subIcon: "material-symbols-light:pending-actions",
//         subName: "Manage Network",
//         subPath: "/network/manage-network",
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Package",
//     key: "package", // added
//     icon: "hugeicons:package-02",
//     items: [
//       {
//         parentId: 3,
//         subId: 31,
//         subIcon: "system-uicons:box-add",
//         subName: "Create package",
//         subPath: "/package/create-package",
//       },
//       {
//         parentId: 3,
//         subId: 32,
//         subIcon: "fluent:arrow-up-square-settings-24-regular",
//         subName: "Manage Package",
//         subPath: "/package/manage-package",
//       },
//       {
//         parentId: 3,
//         subId: 33,
//         subIcon: "solar:archive-up-broken",
//         subName: "Archive Package",
//         subPath: "/package/archive-package",
//       },
//     ],
//   },
//   {
//     id: 4,
//     name: "Affiliate",
//     key: "affiliate", // added
//     path: "affiliate",
//     icon: "tabler:affiliate",
//   },
//   {
//     id: 5,
//     name: "Advertiser",
//     key: "advertise", // added
//     path: "/advertiser",
//     icon: "pepicons-pencil:megaphone",
//   },
//   {
//     id: 6,
//     name: "Subscriptions",
//     key: "subscription", // added
//     path: "/subscriptions",
//     icon: "solar:bag-2-broken",
//   },
//   {
//     id: 7,
//     name: "User",
//     key: "user", // added
//     path: "/users",
//     icon: "mynaui:user-square",
//   },
//   {
//     id: 8,
//     name: "Coupon",
//     key: "coupon", // added
//     path: "/coupon",
//     icon: "streamline:discount-percent-coupon",
//   },
// ];

export const menuItems = [
  {
    id: 1,
    name: "Dashboard",
    icon: "hugeicons:chart-bar-line",
    path: "/",
  },
  {
    id: 2,
    name: "Tours",
    key: "tours",
    icon: "tabler:affiliate",
    items: [
      {
        parentId: 2,
        subId: 21,
        subIcon: "mdi:plus-box-outline",
        subName: "Add Tour",
        subPath: "/tours/add-tour",
      },
      {
        parentId: 2,
        subId: 22,
        subIcon: "mdi:map-clock-outline",
        subName: "Manage Tours",
        subPath: "/tours/manage-tours",
      },
    ],
  },
  {
    id: 3,
    name: "Packages",
    key: "packages",
    icon: "oui:package",
    items: [
      {
        parentId: 3,
        subId: 31,
        subIcon: "system-uicons:box-add",
        subName: "Create Package",
        subPath: "/package/create-package",
      },
      {
        parentId: 3,
        subId: 32,
        subIcon: "fluent:arrow-sync-checkmark-24-regular",
        subName: "Manage Packages",
        subPath: "/package/manage-package",
      },
    ],
  },
  {
    id: 4,
    name: "Bookings",
    key: "bookings",
    path: "/bookings",
    icon: "ph:handshake",
  },
  {
    id: 5,
    name: "User",
    key: "user",
    icon: "mynaui:user-square",
    path: "/user",
  },
  {
    id: 6,
    name: "Employe",
    key: "employe",
    icon: "clarity:employee-line",
    items: [
      {
        parentId: 6,
        subId: 61,
        subIcon: "mdi:plus-box-outline",
        subName: "Add Employe",
        subPath: "/employe/add-employe",
      },
      {
        parentId: 6,
        subId: 62,
        subIcon: "mdi:account-multiple-outline",
        subName: "Manage Employe",
        subPath: "/employe",
      },
    ],
  },

  {
    id: 7,
    name: "Blog & News",
    key: "blog",
    path: "/blog",
    icon: "solar:document-add-linear",
  },
  {
    id: 8,
    name: "Hotels",
    key: "hotels",
    icon: "hugeicons:house-04",
    items: [
      {
        parentId: 6,
        subId: 61,
        subIcon: "mdi:plus-box-outline",
        subName: "Add Hotel",
        subPath: "/hotel/add-hotel",
      },
      {
        parentId: 6,
        subId: 62,
        subIcon: "mdi:account-multiple-outline",
        subName: "Manage Hotel",
        subPath: "/hotel/manage-hotel",
      },
    ],
  },
  {
    id: 9,
    name: "Transport",
    key: "transport",
    path: "/transport",
    icon: "hugeicons:car-03",
  },
  {
    id: 10,
    name: "Visa Services",
    key: "visa",
    path: "/visa",
    icon: "solar:passport-outline",
  },
  {
    id: 11,
    name: "Coupon",
    key: "coupon",
    path: "/coupon",
    icon: "hugeicons:coupon-02",
  },
];

// Role For Option

export const userRoleOptions = [
  { value: "user", label: "User" },
  { value: "special-user", label: "Special User" },
];

export const employeRoleOptions = [
  { value: "admin", label: "Admin" },
  { value: "superAdmin", label: "Super Admin" },
  { value: "account-manage", label: "Account Manage" },
  { value: "content-manager", label: "Content Manage" },
];

export const userStatusOptions = [
  { value: "", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];
