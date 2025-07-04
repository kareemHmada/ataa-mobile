import ItemDonation from "../models/ItemDonation";

export const ITEMDONATION = [
  new ItemDonation(
    "c1",
    "ECG Device",
    "2024-03-15",
    "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/85/730588/1.jpg?1587",
    "Complete",
    "Modern ECG machine for heart disease diagnosis",
    "Diagnostic Equipment"
  ),
  new ItemDonation(
    "c2",
    "Sugar Measuring Device",
    "2024-03-10",
    "https://m.media-amazon.com/images/I/713sTFi4RAL._SX522_.jpg",
    "Waiting",
    "Device for measuring blood sugar levels",
    "Monitoring Equipment"
  ),
  new ItemDonation(
    "c3",
    "Ventilators",
    "2024-03-05",
    "https://ahl-masr.ngo/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2024/03/Ventilator-Transport.png.webp",
    "Implementation",
    "Ventilator machine for patients",
    "Therapeutic Equipment"
  ),
];

let donations = [...ITEMDONATION];

export const addDonation = (newDonation) => {
  const id = `c${donations.length + 1}`;
  const donationWithId = new ItemDonation(
    id,
    newDonation.title,
    newDonation.date,
    newDonation.imageUrl,
    newDonation.status || "Waiting",
    newDonation.description,
    newDonation.category
  );

  donations.push(donationWithId);
  return donations;
};

export const getDonations = () => [...donations];

export const chatData = {
  conversations: [
    {
      id: "1",
      name: "مستشفى الشفاء",
      lastMessage: "هل يمكننا تزويد موعد لتسليم المستلزمات؟",
      avatar: "https://www.u-medservices.com/guideImages/20210614105849.jpg",
      messages: [
        {
          id: "1-1",
          text: "مرحباً، نود التنسيق لتسليم المستلزمات الطبية",
          sender: "them",
          time: "10:30 ص",
        },
        {
          id: "1-2",
          text: "نعم تفضلوا، متى يناسبكم؟",
          sender: "me",
          time: "10:35 ص",
        },
        {
          id: "1-3",
          text: "هل يمكننا تزويد موعد لتسليم المستلزمات؟",
          sender: "them",
          time: "11:00 ص",
        },
      ],
    },
    {
      id: "2",
      name: "جمعية الإحسان",
      lastMessage: "شكراً لتبرعكم الأخير",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5_Vgr069TuGjLdQxCh2GzycPGR9ziq2HbQA&s",
      messages: [
        {
          id: "2-1",
          text: "شكراً لتبرعكم الأخير بالأجهزة الطبية",
          sender: "them",
          time: "أمس",
        },
        {
          id: "2-2",
          text: "العفو، نرحب بأي طلبات أخرى",
          sender: "me",
          time: "أمس",
        },
      ],
    },
  ],
};

export const updateUserChatData = (newData) => {
  Object.assign(chatData, newData);
  return chatData;
};

export const userData = {
  profile: {
    fullName: "أحمد محمد",
    email: "e@example.com",
  },
  notifications: {
    email: true,
    messages: true,
    donations: true,
  },
  privacy: {
    showContactInfo: true,
    showDonationHistory: true,
  },
};

export const updateUserData = (newData) => {
  Object.assign(userData, newData);
  return userData;
};

export const orgData = {
  profile: {
    orgName: "Al-Rahma Charity",
    email: "info@rahma.org",
    website: "www.rahma.org",
    address: "Cairo, Egypt",
    description: "A charity organization aiming to help those in need",
  },
  notifications: {
    email: true,
    newRequests: true,
    newMessages: true,
    requestUpdates: true,
  },
};

export const updateOrgData = (newData) => {
  Object.assign(orgData, newData);
  return orgData;
};

export const orgChatData = {
  conversations: [
    {
      id: "org1",
      name: "Mohamed Ahmed",
      lastMessage: "تم استلام التبرع بنجاح",
      avatar: "https://example.com/user1.jpg",
      messages: [
        {
          id: "org1-1",
          text: "مرحباً، نود التبرع ببعض المستلزمات الطبية",
          sender: "them",
          time: "10:30 ص",
        },
        {
          id: "org1-2",
          text: "شكراً لكم، ما هي أنواع المستلزمات؟",
          sender: "me",
          time: "10:35 ص",
        },
        {
          id: "org1-3",
          text: "تم استلام التبرع بنجاح",
          sender: "me",
          time: "11:00 ص",
        },
      ],
    },
    {
      id: "org2",
      name: "Ali Mahmoud",
      lastMessage: "هل لديكم أجهزة تنفس صناعي؟",
      avatar: "https://example.com/user2.jpg",
      messages: [
        {
          id: "org2-1",
          text: "هل لديكم أجهزة تنفس صناعي؟",
          sender: "them",
          time: "أمس",
        },
        {
          id: "org2-2",
          text: "نعم لدينا، كم عدد القطع المطلوبة؟",
          sender: "me",
          time: "أمس",
        },
      ],
    },
  ],
};

export const updateOrgChatData = (newData) => {
  Object.assign(orgChatData, newData);
  return orgChatData;
};
export class DonationRequest {
  constructor(
    id,
    type,
    quantity,
    condition,
    description,
    images,
    location,
    notes,
    status = "Pending",
    orgId,
    userId
  ) {
    this.id = id;
    this.type = type;
    this.quantity = quantity;
    this.condition = condition;
    this.description = description;
    this.images = images;
    this.location = location;
    this.notes = notes;
    this.status = status;
    this.orgId = orgId;
    this.userId = userId;
    this.createdAt = new Date().toISOString();
  }
}

let donationRequests = [
  new DonationRequest(
    "req1",
    "Clothes",
    "10",
    "Good",
    "Men's winter clothes in good condition",
    "https://www.realsimple.com/thmb/Bxa0JHnzInjE_04lIqZEcF6H74o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/reuse-old-clothes-gettyimages-1316931901-e574c71950ed47c7a9bcce3d1c7911a0.jpg",
    "Cairo, Egypt",
    "Please contact before pickup",
    "Received",
    "org123", // ID الجمعية
    null // لا يوجد user ID لأن الطلب من جمعية
  ),
  new DonationRequest(
    "req2",
    "Toys",
    "5",
    "Like New",
    "Children's toys in excellent condition",
    "https://cdn.firstcry.com/education/2022/11/06094158/Toy-Names-For-Kids-696x476.jpg",
    "Alexandria, Egypt",
    "Available on weekends",
    "Pending",
    null, // لا يوجد org ID
    "user123" // ID المستخدم
  ),
];

export const addDonationRequest = (newRequest) => {
  const id = `req${donationRequests.length + 1}`;
  const request = new DonationRequest(
    id,
    newRequest.type,
    newRequest.quantity,
    newRequest.condition,
    newRequest.description,
    newRequest.images,
    newRequest.location,
    newRequest.notes,
    newRequest.status,
    newRequest.orgId,
    newRequest.userId
  );
  donationRequests.push(request);
  return request;
};

export const getDonationRequests = () => [...donationRequests];
export const getRequestsByUserId = (userId) =>
  donationRequests.filter((req) => req.userId === userId);
