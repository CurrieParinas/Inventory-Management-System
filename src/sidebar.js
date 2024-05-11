import home from "../src/assets/home.svg"
import item from "../src/assets/box.svg"
import openbox from "../src/assets/open-box.svg"
import barcode from "../src/assets/barcode.svg"
import qrcode from "../src/assets/qr-code.svg"
import generalitem from "../src/assets/generalitem.svg"
import location from "../src/assets/location.svg"
import medium from "../src/assets/shelf.svg"
import archive from "../src/assets/archive.svg"




export const menu = [
    {
      id: 1,
      title: "Main",
      listItems: [
        {
          id: 1,
          title: "Homepage",
          url: "/",
          icon: home,
        },
      ],
    },
    {
      id: 2,
      title: "Lists",
      listItems: [
        {
            id: 1,
            title: "General Items",
            url: "/general-items",
            icon: generalitem,
        },
        {
            id: 2,
            title: "Location",
            url: "/location",
            icon: location,
        },
        {
            id: 3,
            title: "Medium",
            url: "/medium",
            icon: medium,
        },
        {
          id: 4,
          title: "Tracked Items",
          url: "/items",
          icon: item,
        },
        {
            id: 5,
            title: "Untracked Item",
            url: "/untrack",
            icon: openbox,
        },
        {
          id: 6,
          title: "Barcodes",
          url: "/barcodes",
          icon: barcode,
        },
        {
            id: 7,
            title: "QR codes",
            url: "/qrcodes",
            icon: qrcode,
        },
        {
            id: 8,
            title: "Archived",
            url: "/archive",
            icon: archive,
        },
      ],
    },
  ];
  
  export const trackedItems = [
    {
      id: 1,
      itemName: "Shampoo",
      category: "Hygiene",
      brand: "L'Occitane",
      quantity: "13",
    },
    {
      id: 2,
      itemName: "Conditioner",
      category: "Beauty",
      brand: "British Gentle",
      quantity: "18",
    },
    {
      id: 3,
      itemName: "Toothpick",
      category: "Personal Care",
      brand: "Manong",
      quantity: "158",
    },
    {
      id: 4,
      itemName: "Jowa",
      category: "Partners",
      brand: "Lovelife",
      quantity: "3",
    },
    {
      id: 5,
      itemName: "Gulong",
      category: "Vehicle Component",
      brand: "Goodyear",
      quantity: "4",
    },
  ];
  export const untrackedItems = [
    {
      id: 1,
      itemName: "Laptop Charger",
      category: "Electronics",
      brand: "Apple",
    },
    {
      id: 2,
      itemName: "Reusable Water Bottle",
      category: "Fitness",
      brand: "Hydro Flask",
    },
    {
      id: 3,
      itemName: "Notebook",
      category: "Stationery",
      brand: "Moleskine",
    },
    {
      id: 4,
      itemName: "Sunglasses",
      category: "Accessories",
      brand: "Ray-Ban",
    },
    {
      id: 5,
      itemName: "Travel Pillow",
      category: "Travel Accessories",
      brand: "Cabeau",
    },
];
    export const locationDummy = [
    {
      id: 1,
      locationName: "Bookshelf A",
      parentLocation: "Living Room"
    },
    {
      id: 2,
      locationName: "Closet A",
      parentLocation: "Bedroom"
    },
    {
      id: 3,
      locationName: "Garage Shelf",
      parentLocation: "Garage"
    },
    {
      id: 4,
      locationName: "Pantry Shelf",
      parentLocation: "Kitchen"
    },
    {
      id: 5,
      locationName: "Drawer A",
      parentLocation: "Office"
    },
];
    export const mediumDummy = [
    {
      id: 1,
      locationName: "Box1",
      parentLocation: "Attic Cabinet"
    },
    {
      id: 2,
      locationName: "Drawer 1",
      parentLocation: "Bedroom  Cabinet"
    },
    {
      id: 3,
      locationName: "Toolbox",
      parentLocation: "Garage Shelf"
    },
    {
      id: 4,
      locationName: "Shoe Rack",
      parentLocation: "Entryway Closet"
    },
    {
      id: 5,
      locationName: "Organizer",
      parentLocation: "Kitchen Drawer"
    },
];
  
  export const barChartUntrackedItemsAdded = {
    title: "Untracked Item Frequency",
    color: "#70c6cf",
    dataKey: "quantity",
    chartData: [
        {
          name: "Sun",
          quantity: Math.floor(Math.random() * 100) + 100,
        },
        {
          name: "Mon",
          quantity: Math.floor(Math.random() * 100) + 100,
        },
        {
          name: "Tue",
          quantity: Math.floor(Math.random() * 100) + 100,
        },
        {
          name: "Wed",
          quantity: Math.floor(Math.random() * 100) + 100,
        },
        {
          name: "Thu",
          quantity: Math.floor(Math.random() * 100) + 100,
        },
        {
          name: "Fri",
          quantity: Math.floor(Math.random() * 100) + 100,
        },
        {
          name: "Sat",
          quantity: Math.floor(Math.random() * 100) + 100,
        },
      ],
  };
  
  
  export const barChartTrackedItemsAdded = {
    title: "Tracked Item Frequency",
    color: "#73a9fa",
    dataKey: "quantity",
    chartData: [
        {
          name: "Sun",
          quantity: Math.floor(Math.random() * 100) + 100,
        },
        {
          name: "Mon",
          quantity: Math.floor(Math.random() * 100) + 100,
        },
        {
          name: "Tue",
          quantity: Math.floor(Math.random() * 100) + 100,
        },
        {
          name: "Wed",
          quantity: Math.floor(Math.random() * 100) + 100,
        },
        {
          name: "Thu",
          quantity: Math.floor(Math.random() * 100) + 100,
        },
        {
          name: "Fri",
          quantity: Math.floor(Math.random() * 100) + 100,
        },
        {
          name: "Sat",
          quantity: Math.floor(Math.random() * 100) + 100,
        },
      ],
  };
  
  
  export const itemRows = [
    { id: 1, name: 'Product A', codename: 'PRA', brand: 'Brand X', quantity: 100, storageMedium: 'Box', storageLocation: 'Warehouse A', dateCreated: '2022-01-01', dateModified: '2022-01-15' },
    { id: 2, name: 'Product B', codename: 'PRB', brand: 'Brand Y', quantity: 200, storageMedium: 'Shelf', storageLocation: 'Warehouse B', dateCreated: '2022-02-05', dateModified: '2022-03-10' },
    { id: 3, name: 'Product C', codename: 'PRC', brand: 'Brand Z', quantity: 150, storageMedium: 'Crate', storageLocation: 'Warehouse C', dateCreated: '2022-03-10', dateModified: '2022-03-25' },
    { id: 4, name: 'Product D', codename: 'PRD', brand: 'Brand X', quantity: 300, storageMedium: 'Box', storageLocation: 'Warehouse A', dateCreated: '2022-04-15', dateModified: '2022-04-20' },
    { id: 5, name: 'Product E', codename: 'PRE', brand: 'Brand Y', quantity: 120, storageMedium: 'Shelf', storageLocation: 'Warehouse B', dateCreated: '2022-05-20', dateModified: '2022-06-05' },
    { id: 6, name: 'Product F', codename: 'PRF', brand: 'Brand X', quantity: 180, storageMedium: 'Crate', storageLocation: 'Warehouse A', dateCreated: '2022-07-10', dateModified: '2022-07-15' },
    { id: 7, name: 'Product G', codename: 'PRG', brand: 'Brand Z', quantity: 250, storageMedium: 'Shelf', storageLocation: 'Warehouse C', dateCreated: '2022-08-05', dateModified: '2022-09-20' },
    { id: 8, name: 'Product H', codename: 'PRH', brand: 'Brand Y', quantity: 190, storageMedium: 'Box', storageLocation: 'Warehouse B', dateCreated: '2022-09-10', dateModified: '2022-09-25' },
    { id: 9, name: 'Product I', codename: 'PRI', brand: 'Brand X', quantity: 280, storageMedium: 'Crate', storageLocation: 'Warehouse A', dateCreated: '2022-10-15', dateModified: '2022-11-05' },
    { id: 10, name: 'Product J', codename: 'PRJ', brand: 'Brand Z', quantity: 320, storageMedium: 'Box', storageLocation: 'Warehouse C', dateCreated: '2022-11-20', dateModified: '2022-12-10' },
    { id: 11, name: 'Product K', codename: 'PRK', brand: 'Brand Y', quantity: 140, storageMedium: 'Shelf', storageLocation: 'Warehouse B', dateCreated: '2023-01-01', dateModified: '2023-01-15' },
    { id: 12, name: 'Product L', codename: 'PRL', brand: 'Brand X', quantity: 220, storageMedium: 'Crate', storageLocation: 'Warehouse A', dateCreated: '2023-02-05', dateModified: '2023-03-10' },
    { id: 13, name: 'Product M', codename: 'PRM', brand: 'Brand Z', quantity: 180, storageMedium: 'Box', storageLocation: 'Warehouse C', dateCreated: '2023-03-10', dateModified: '2023-03-25' },
    { id: 14, name: 'Product N', codename: 'PRN', brand: 'Brand Y', quantity: 260, storageMedium: 'Shelf', storageLocation: 'Warehouse B', dateCreated: '2023-04-15', dateModified: '2023-04-20' },
    { id: 15, name: 'Product O', codename: 'PRO', brand: 'Brand X', quantity: 150, storageMedium: 'Crate', storageLocation: 'Warehouse A', dateCreated: '2023-05-20', dateModified: '2023-06-05' },
    { id: 16, name: 'Product P', codename: 'PRP', brand: 'Brand Z', quantity: 330, storageMedium: 'Box', storageLocation: 'Warehouse C', dateCreated: '2023-07-10', dateModified: '2023-07-15' },
    { id: 17, name: 'Product Q', codename: 'PRQ', brand: 'Brand Y', quantity: 200, storageMedium: 'Shelf', storageLocation: 'Warehouse B', dateCreated: '2023-08-05', dateModified: '2023-09-20' },
    { id: 18, name: 'Product R', codename: 'PRR', brand: 'Brand X', quantity: 290, storageMedium: 'Crate', storageLocation: 'Warehouse A', dateCreated: '2023-09-10', dateModified: '2023-09-25' },
    { id: 19, name: 'Product S', codename: 'PRS', brand: 'Brand Z', quantity: 140, storageMedium: 'Box', storageLocation: 'Warehouse C', dateCreated: '2023-10-15', dateModified: '2023-11-05' },
    { id: 20, name: 'Product T', codename: 'PRT', brand: 'Brand Y', quantity: 180, storageMedium: 'Shelf', storageLocation: 'Warehouse B', dateCreated: '2023-11-20', dateModified: '2023-12-10' },
    { id: 21, name: 'Product U', codename: 'PRU', brand: 'Brand X', quantity: 270, storageMedium: 'Crate', storageLocation: 'Warehouse A', dateCreated: '2024-01-01', dateModified: '2024-01-15' },
    { id: 22, name: 'Product V', codename: 'PRV', brand: 'Brand Z', quantity: 320, storageMedium: 'Box', storageLocation: 'Warehouse C', dateCreated: '2024-02-05', dateModified: '2024-03-10' },
    { id: 23, name: 'Product W', codename: 'PRW', brand: 'Brand Y', quantity: 230, storageMedium: 'Shelf', storageLocation: 'Warehouse B', dateCreated: '2024-03-10', dateModified: '2024-03-25' },
    { id: 24, name: 'Product X', codename: 'PRX', brand: 'Brand X', quantity: 260, storageMedium: 'Crate', storageLocation: 'Warehouse A', dateCreated: '2024-04-15', dateModified: '2024-04-20' },
    { id: 25, name: 'Product Y', codename: 'PRY', brand: 'Brand Z', quantity: 180, storageMedium: 'Box', storageLocation: 'Warehouse C', dateCreated: '2024-05-20', dateModified: '2024-06-05' },
    { id: 26, name: 'Product Z', codename: 'PRZ', brand: 'Brand Y', quantity: 210, storageMedium: 'Shelf', storageLocation: 'Warehouse B', dateCreated: '2024-07-10', dateModified: '2024-07-15' },
    { id: 27, name: 'Product AA', codename: 'PRAA', brand: 'Brand X', quantity: 290, storageMedium: 'Crate', storageLocation: 'Warehouse A', dateCreated: '2024-08-05', dateModified: '2024-09-20' },
    { id: 28, name: 'Product BB', codename: 'PRBB', brand: 'Brand Z', quantity: 340, storageMedium: 'Box', storageLocation: 'Warehouse C', dateCreated: '2024-09-10', dateModified: '2024-09-25' },
    { id: 29, name: 'Product CC', codename: 'PRCC', brand: 'Brand Y', quantity: 250, storageMedium: 'Shelf', storageLocation: 'Warehouse B', dateCreated: '2024-10-15', dateModified: '2024-11-05' },
    { id: 30, name: 'Product DD', codename: 'PRDD', brand: 'Brand X', quantity: 180, storageMedium: 'Crate', storageLocation: 'Warehouse A', dateCreated: '2024-11-20', dateModified: '2024-12-10' },
  ];
  
  export const itemRowsUntracked = [
    { id: 1, name: 'Product AA', codename: 'PRAA', brand: 'Brand X', storageMedium: 'Crate', storageLocation: 'Warehouse A', dateCreated: '2025-01-01', dateModified: '2025-01-15' },
    { id: 2, name: 'Product BB', codename: 'PRBB', brand: 'Brand Z', storageMedium: 'Box', storageLocation: 'Warehouse C', dateCreated: '2025-02-05', dateModified: '2025-03-10' },
    { id: 3, name: 'Product CC', codename: 'PRCC', brand: 'Brand Y', storageMedium: 'Shelf', storageLocation: 'Warehouse B', dateCreated: '2025-03-10', dateModified: '2025-03-25' },
    { id: 4, name: 'Product DD', codename: 'PRDD', brand: 'Brand X', storageMedium: 'Crate', storageLocation: 'Warehouse A', dateCreated: '2025-04-15', dateModified: '2025-04-20' },
    { id: 5, name: 'Product EE', codename: 'PREE', brand: 'Brand Z', storageMedium: 'Box', storageLocation: 'Warehouse C', dateCreated: '2025-05-20', dateModified: '2025-06-05' },
    { id: 6, name: 'Product FF', codename: 'PRFF', brand: 'Brand Y', storageMedium: 'Shelf', storageLocation: 'Warehouse B', dateCreated: '2025-07-10', dateModified: '2025-07-15' },
    { id: 7, name: 'Product GG', codename: 'PRGG', brand: 'Brand X', storageMedium: 'Crate', storageLocation: 'Warehouse A', dateCreated: '2025-08-05', dateModified: '2025-09-20' },
    { id: 8, name: 'Product HH', codename: 'PRHH', brand: 'Brand Z', storageMedium: 'Box', storageLocation: 'Warehouse C', dateCreated: '2025-09-10', dateModified: '2025-09-25' },
    { id: 9, name: 'Product II', codename: 'PRII', brand: 'Brand Y', storageMedium: 'Shelf', storageLocation: 'Warehouse B', dateCreated: '2025-10-15', dateModified: '2025-11-05' },
    { id: 10, name: 'Product JJ', codename: 'PRJJ', brand: 'Brand X', storageMedium: 'Crate', storageLocation: 'Warehouse A', dateCreated: '2025-11-20', dateModified: '2025-12-10' },
    { id: 11, name: 'Product KK', codename: 'PRKK', brand: 'Brand Z', storageMedium: 'Box', storageLocation: 'Warehouse C', dateCreated: '2026-01-01', dateModified: '2026-01-15' },
    { id: 12, name: 'Product LL', codename: 'PRLL', brand: 'Brand Y', storageMedium: 'Shelf', storageLocation: 'Warehouse B', dateCreated: '2026-02-05', dateModified: '2026-03-10' },
    { id: 13, name: 'Product MM', codename: 'PRMM', brand: 'Brand X', storageMedium: 'Crate', storageLocation: 'Warehouse A', dateCreated: '2026-03-10', dateModified: '2026-03-25' },
    { id: 14, name: 'Product NN', codename: 'PRNN', brand: 'Brand Z', storageMedium: 'Box', storageLocation: 'Warehouse C', dateCreated: '2026-04-15', dateModified: '2026-04-20' },
    { id: 15, name: 'Product OO', codename: 'PROO', brand: 'Brand Y', storageMedium: 'Shelf', storageLocation: 'Warehouse B', dateCreated: '2026-05-20', dateModified: '2026-06-05' },
    { id: 16, name: 'Product PP', codename: 'PRPP', brand: 'Brand X', storageMedium: 'Crate', storageLocation: 'Warehouse A', dateCreated: '2026-07-10', dateModified: '2026-07-15' },
    { id: 17, name: 'Product QQ', codename: 'PRQQ', brand: 'Brand Z', storageMedium: 'Box', storageLocation: 'Warehouse C', dateCreated: '2026-08-05', dateModified: '2026-09-20' },
    { id: 18, name: 'WalangJowa', codename: 'PRRR', brand: 'Brand Y', storageMedium: 'Shelf', storageLocation: 'Warehouse B', dateCreated: '2026-09-10', dateModified: '2026-09-25' },
    { id: 19, name: 'Product SS', codename: 'PRSS', brand: 'Brand X', storageMedium: 'Crate', storageLocation: 'Warehouse A', dateCreated: '2026-10-15', dateModified: '2026-11-05' },
    { id: 20, name: 'Product TT', codename: 'PRTT', brand: 'Brand Z', storageMedium: 'Box', storageLocation: 'Warehouse C', dateCreated: '2026-11-20', dateModified: '2026-12-10' },
    { id: 21, name: 'Product UU', codename: 'PRUU', brand: 'Brand Y', storageMedium: 'Shelf', storageLocation: 'Warehouse B', dateCreated: '2027-01-01', dateModified: '2027-01-15' },
    { id: 22, name: 'Product VV', codename: 'PRVV', brand: 'Brand X', storageMedium: 'Crate', storageLocation: 'Warehouse A', dateCreated: '2027-02-05', dateModified: '2027-03-10' },
    { id: 23, name: 'Product WW', codename: 'PRWW', brand: 'Brand Z', storageMedium: 'Box', storageLocation: 'Warehouse C', dateCreated: '2027-03-10', dateModified: '2027-03-25' },
    { id: 24, name: 'Product XX', codename: 'PRXX', brand: 'Brand Y', storageMedium: 'Shelf', storageLocation: 'Warehouse B', dateCreated: '2027-04-15', dateModified: '2027-04-20' },
    { id: 25, name: 'Product YY', codename: 'PRYY', brand: 'Brand X', storageMedium: 'Crate', storageLocation: 'Warehouse A', dateCreated: '2027-05-20', dateModified: '2027-06-05' },
    { id: 26, name: 'Product ZZ', codename: 'PRZZ', brand: 'Brand Z', storageMedium: 'Box', storageLocation: 'Warehouse C', dateCreated: '2027-07-10', dateModified: '2027-07-15' },
    { id: 27, name: 'Product AAA', codename: 'PRAAA', brand: 'Brand Y', storageMedium: 'Shelf', storageLocation: 'Warehouse B', dateCreated: '2027-08-05', dateModified: '2027-09-20' },
    { id: 28, name: 'Product BBB', codename: 'PRBBB', brand: 'Brand X', storageMedium: 'Crate', storageLocation: 'Warehouse A', dateCreated: '2027-09-10', dateModified: '2027-09-25' },
    { id: 29, name: 'Product CCC', codename: 'PRCCC', brand: 'Brand Z', storageMedium: 'Box', storageLocation: 'Warehouse C', dateCreated: '2027-10-15', dateModified: '2027-11-05' },
    { id: 30, name: 'Product DDD', codename: 'PRDDD', brand: 'Brand Y', storageMedium: 'Shelf', storageLocation: 'Warehouse B', dateCreated: '2027-11-20', dateModified: '2027-12-10' },
  ];
  
  
  
  
  export const singleUser = {
    id: 1,
    title: "John Doe",
    img: "https://images.pexels.com/photos/17397364/pexels-photo-17397364.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    info: {
      username: "Johndoe99",
      fullname: "John Doe",
      email: "johndoe@gmail.com",
      phone: "123 456 789",
      status: "verified",
    },
    chart: {
      dataKeys: [
        { name: "visits", color: "#82ca9d" },
        { name: "clicks", color: "#8884d8" },
      ],
      data: [
        {
          name: "Sun",
          visits: 4000,
          clicks: 2400,
        },
        {
          name: "Mon",
          visits: 3000,
          clicks: 1398,
        },
        {
          name: "Tue",
          visits: 2000,
          clicks: 3800,
        },
        {
          name: "Wed",
          visits: 2780,
          clicks: 3908,
        },
        {
          name: "Thu",
          visits: 1890,
          clicks: 4800,
        },
        {
          name: "Fri",
          visits: 2390,
          clicks: 3800,
        },
        {
          name: "Sat",
          visits: 3490,
          clicks: 4300,
        },
      ],
    },
    activities: [
      {
        text: "John Doe purchased Playstation 5 Digital Edition",
        time: "3 day ago",
      },
      {
        text: "John Doe added 3 items into their wishlist",
        time: "1 week ago",
      },
      {
        text: "John Doe purchased Sony Bravia KD-32w800",
        time: "2 weeks ago",
      },
      {
        text: "John Doe reviewed a product",
        time: "1 month ago",
      },
      {
        text: "John Doe added 1 items into their wishlist",
        time: "1 month ago",
      },
      {
        text: "John Doe reviewed a product",
        time: "2 months ago",
      },
    ],
  };
  export const singleProduct = {
    id: 1,
    title: "Playstation 5 Digital Edition",
    img: "https://store.sony.com.au/on/demandware.static/-/Sites-sony-master-catalog/default/dw1b537bbb/images/PLAYSTATION5W/PLAYSTATION5W.png",
    info: {
      productId: "Ps5SDF1156d",
      color: "white",
      price: "$250.99",
      producer: "Sony",
      export: "Japan",
    },
    chart: {
      dataKeys: [
        { name: "visits", color: "#82ca9d" },
        { name: "orders", color: "#8884d8" },
      ],
      data: [
        {
          name: "Sun",
          visits: 4000,
          orders: 2400,
        },
        {
          name: "Mon",
          visits: 3000,
          orders: 1398,
        },
        {
          name: "Tue",
          visits: 2000,
          orders: 3800,
        },
        {
          name: "Wed",
          visits: 2780,
          orders: 3908,
        },
        {
          name: "Thu",
          visits: 1890,
          orders: 4800,
        },
        {
          name: "Fri",
          visits: 2390,
          orders: 3800,
        },
        {
          name: "Sat",
          visits: 3490,
          orders: 4300,
        },
      ],
    },
    activities: [
      {
        text: "John Doe purchased Playstation 5 Digital Edition",
        time: "3 day ago",
      },
      {
        text: "Jane Doe added Playstation 5 Digital Edition into their wishlist",
        time: "1 week ago",
      },
      {
        text: "Mike Doe purchased Playstation 5 Digital Edition",
        time: "2 weeks ago",
      },
      {
        text: "Anna Doe reviewed the product",
        time: "1 month ago",
      },
      {
        text: "Michael Doe added Playstation 5 Digital Edition into their wishlist",
        time: "1 month ago",
      },
      {
        text: "Helen Doe reviewed the product",
        time: "2 months ago",
      },
    ],
  };