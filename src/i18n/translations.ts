export type Language = 'en' | 'cs';

export interface Translations {
  // App-level
  app: {
    brandName: string;
    title: string;
    searchPrompt: string;
    loadingClient: string;
    productDetail: string;
    interactionDetail: string;
    behaviorDetail: string;
    satisfactionDetail: string;
  };

  // Search
  search: {
    placeholder: string;
    searching: string;
    noResults: (query: string) => string;
  };

  // Header
  header: {
    years: string;
    birthday: string;
    gdprOk: string;
    gdprWarning: string;
    lastVisit: string;
    lastCall: string;
  };

  // Products
  products: {
    title: string;
    moreProducts: (count: number) => string;
    // Product types
    types: {
      mortgage: string;
      consumer_loan: string;
      insurance: string;
      pension: string;
      investment: string;
      savings_account: string;
    };
    renewal: string;
    // Credit card
    credit: string;
    debit: string;
    availableLOP: string;
    limit: string;
    owed: string;
    minPayment: string;
    due: string;
    revolving: string;
    transactional: string;
    // Debit card
    exp: string;
    last: string;
    daily: string;
    threeDS: string;
    pay: string;
    declined: (count: number) => string;
    // Current account
    standingOrders: string;
    directDebits: string;
    in_: string;
    out_: string;
    mo: string;
  };

  // Status
  status: {
    active: string;
    closed: string;
    suspended: string;
  };

  // Segments
  segments: {
    standard: string;
    affluent: string;
    premium: string;
  };

  // Channels
  channels: {
    branch: string;
    call_center: string;
    chat: string;
    email: string;
    voicebot: string;
    chatbot: string;
    mobile_app: string;
    internet_banking: string;
  };

  // Channel short labels (for behavior chart)
  channelsShort: {
    branch: string;
    call_center: string;
    mobile_app: string;
    internet_banking: string;
    chat: string;
    email: string;
    voicebot: string;
    chatbot: string;
  };

  // Activity
  activity: {
    title: string;
    noInteractions: string;
    open: string;
    showMore: (count: number) => string;
  };

  // Behavior
  behavior: {
    title: string;
    channelPreference: string;
    balanceTrend: string;
    growing: string;
    stable: string;
    declining: string;
    per30d: string;
    digitalEngagement: string;
    low: string;
    medium: string;
    high: string;
    logins30d: (count: number) => string;
    intlActivity: string;
    tx: (count: number) => string;
    none: string;
    ninetyDays: string;
    onlineShopping: string;
  };

  // Sales
  sales: {
    title: string;
    noRecommendations: string;
    rules: string;
    ml: string;
    priorityHigh: string;
    priorityMed: string;
    priorityLow: string;
    showAction: string;
  };

  // Slideout
  slideout: {
    closePanel: string;
    loadingProduct: string;
    productNotFound: string;
    loadingInteraction: string;
    interactionNotFound: string;
    opened: string;
    expires: string;
    recentTransactions: string;
    intl: string;
    cardNumber: string;
    variant: string;
    dailyLimit: string;
    monthlyLimit: string;
    threeDSecure: string;
    applePay: string;
    googlePay: string;
    approvalRate: string;
    on: string;
    off: string;
    yes: string;
    no: string;
    creditLimit: string;
    outstanding: string;
    availableLOP: string;
    minPayment: string;
    mode: string;
    tariff: string;
    month: string;
    balance: string;
    available: string;
    standingOrders: string;
    directDebits: string;
    incoming: string;
    outgoing: string;
    // Interaction detail
    resolved: string;
    open: string;
    location: string;
    agent: string;
    summary: string;
    notes: string;
    relatedTicket: string;
    // Transaction detail
    txCategory: string;
    txStatus: string;
    txCurrency: string;
    // Transaction statuses
    txCompleted: string;
    txPending: string;
    txDeclined: string;
    // Transaction categories
    categories: {
      groceries: string;
      e_commerce: string;
      travel: string;
      dining: string;
      transport: string;
      utilities: string;
      entertainment: string;
      health: string;
      education: string;
      atm: string;
      transfer: string;
      salary: string;
      insurance: string;
      pension: string;
      other: string;
    };
  };

  // Sentiment
  sentiment: {
    positive: string;
    neutral: string;
    negative: string;
    noData: string;
  };

  // Behavior detail
  behaviorDetail: {
    title: string;
    balanceHistory: string;
    currentBalance: string;
    thirtyDaysAgo: string;
    change: string;
    allChannels: string;
    interactions: string;
    recentLogins: string;
    device: string;
    intlTransactions: string;
    onlineTransactions: string;
    merchant: string;
    noData: string;
  };

  // Satisfaction
  satisfaction: {
    title: string;
    detailTitle: string;
    latestNps: string;
    surveyHistory: string;
    verbatimFeedback: string;
    promoter: string;
    passive: string;
    detractor: string;
    noScores: string;
    score: string;
    survey: string;
    surveys: string;
  };

  // Relative dates
  dates: {
    today: string;
    yesterday: string;
    daysAgo: (days: number) => string;
    oneWeekAgo: string;
    weeksAgo: (weeks: number) => string;
    oneMonthAgo: string;
    monthsAgo: (months: number) => string;
  };

  // Alerts (generated dynamically)
  alerts: {
    birthdayTomorrow: string;
    birthdayIn: (days: number) => string;
    cardExpires: (name: string) => string;
    balanceDrop: (pct: number) => string;
    unresolvedComplaints: (count: number) => string;
    gdprExpired: string;
    gdprNoConsent: string;
  };

  // Login
  login: {
    title: string;
    username: string;
    password: string;
    submit: string;
    error: string;
    logout: string;
  };

  // Comments
  comments: {
    title: string;
    allComments: string;
    addComment: string;
    editComment: string;
    noComments: string;
    save: string;
    cancel: string;
    delete: string;
    commentText: string;
    author: string;
    category: string;
    priority: string;
    targetAudience: string;
    statusLabel: string;
    resolve: string;
    reject: string;
    reopen: string;
    openCount: (count: number) => string;
    // Statuses
    statusOpen: string;
    statusResolved: string;
    statusRejected: string;
    // Categories
    catBusiness: string;
    catCustomerWording: string;
    catDataLimitation: string;
    catItFeasibility: string;
    catComplianceLegal: string;
    catUxUi: string;
    catProductIdea: string;
    // Priorities
    priorityLow: string;
    priorityMedium: string;
    priorityHigh: string;
    priorityNone: string;
    // Target audiences
    audienceBusiness: string;
    audienceIt: string;
    audienceData: string;
    audienceCompliance: string;
    audienceProduct: string;
    audienceNone: string;
    // Zone names
    zoneProducts: string;
    zoneActivity: string;
    zoneBehavior: string;
    zoneSales: string;
    zoneHeader: string;
    zoneAlerts: string;
    zoneGeneral: string;
    // Filters
    allStatuses: string;
    allCategories: string;
    allZones: string;
  };

  // Sales tips (rule-generated)
  salesTips: {
    R001: { headline: string; reasoning: (count: number) => string; action: string };
    R002: { headline: string; reasoning: (count: number) => string; action: string };
    R003: { headline: string; reasoning: (count: number) => string; action: string };
    R004: { headline: string; reasoning: (score: number) => string; action: string };
    R005: { headline: string; reasoning: (merchants: string) => string; action: string };
    R006: { headline: string; reasoning: (count: number) => string; action: string };
    R007: { headline: string; reasoning: (pct: number) => string; action: string };
    R008: { headline: string; reasoning: string; action: string };
    R009: { headline: string; reasoning: string; action: string };
    R010: { headline: string; reasoning: string; action: string };
  };
}

export const en: Translations = {
  app: {
    brandName: 'CRM Intelligence',
    title: 'CRM Intelligence Helper',
    searchPrompt: 'Search for a client to begin',
    loadingClient: 'Loading client data...',
    productDetail: 'Product Detail',
    interactionDetail: 'Interaction Detail',
    behaviorDetail: 'Behavior Detail',
    satisfactionDetail: 'Satisfaction Detail',
  },

  search: {
    placeholder: 'Search client by name or ID...',
    searching: 'Searching...',
    noResults: (query) => `No clients found for "${query}"`,
  },

  header: {
    years: 'years',
    birthday: 'Birthday',
    gdprOk: 'GDPR',
    gdprWarning: 'GDPR!',
    lastVisit: 'Last visit:',
    lastCall: 'Last call:',
  },

  products: {
    title: 'Products',
    moreProducts: (count) => `+${count} more products`,
    types: {
      mortgage: 'Mortgage',
      consumer_loan: 'Consumer Loan',
      insurance: 'Insurance',
      pension: 'Pension',
      investment: 'Investment',
      savings_account: 'Savings Account',
    },
    renewal: 'Renewal:',
    credit: 'Credit',
    debit: 'Debit',
    availableLOP: 'Available (LOP)',
    limit: 'Limit:',
    owed: 'Owed:',
    minPayment: 'Min payment:',
    due: 'due',
    revolving: 'Revolving',
    transactional: 'Transactional',
    exp: 'Exp:',
    last: 'Last:',
    daily: 'Daily:',
    threeDS: '3DS',
    pay: 'Pay',
    declined: (count) => `${count} declined`,
    standingOrders: 'Standing orders:',
    directDebits: 'Direct debits:',
    in_: 'In:',
    out_: 'Out:',
    mo: '/mo',
  },

  status: {
    active: 'Active',
    closed: 'Closed',
    suspended: 'Suspended',
  },

  segments: {
    standard: 'Standard',
    affluent: 'Affluent',
    premium: 'Premium',
  },

  channels: {
    branch: 'Branch',
    call_center: 'Call Center',
    chat: 'Chat',
    email: 'Email',
    voicebot: 'Voicebot',
    chatbot: 'Chatbot',
    mobile_app: 'Mobile App',
    internet_banking: 'Internet Banking',
  },

  channelsShort: {
    branch: 'Branch',
    call_center: 'Call',
    mobile_app: 'Mobile',
    internet_banking: 'Web',
    chat: 'Chat',
    email: 'Email',
    voicebot: 'Voice',
    chatbot: 'Bot',
  },

  activity: {
    title: 'Recent Activity',
    noInteractions: 'No recent interactions',
    open: 'Open',
    showMore: (count) => `+${count} more interactions`,
  },

  behavior: {
    title: 'Behavior',
    channelPreference: 'Channel Preference',
    balanceTrend: 'Balance Trend',
    growing: 'Growing',
    stable: 'Stable',
    declining: 'Declining',
    per30d: '% / 30d',
    digitalEngagement: 'Digital Engagement',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    logins30d: (count) => `${count} logins/30d`,
    intlActivity: "Int'l Activity",
    tx: (count) => `${count} tx`,
    none: 'None',
    ninetyDays: '90 days',
    onlineShopping: 'Online Shopping',
  },

  sales: {
    title: 'Sales Tips',
    noRecommendations: 'No recommendations at this time',
    rules: 'Rules',
    ml: 'ML',
    priorityHigh: 'High',
    priorityMed: 'Med',
    priorityLow: 'Low',
    showAction: 'Show action',
  },

  slideout: {
    closePanel: 'Close panel',
    loadingProduct: 'Loading product details...',
    productNotFound: 'Product not found',
    loadingInteraction: 'Loading interaction...',
    interactionNotFound: 'Interaction not found',
    opened: 'Opened:',
    expires: 'Expires:',
    recentTransactions: 'Recent Transactions',
    intl: 'intl',
    cardNumber: 'Card number:',
    variant: 'Variant:',
    dailyLimit: 'Daily limit',
    monthlyLimit: 'Monthly limit',
    threeDSecure: '3D Secure:',
    applePay: 'Apple Pay:',
    googlePay: 'Google Pay:',
    approvalRate: 'Approval rate:',
    on: 'ON',
    off: 'OFF',
    yes: 'Yes',
    no: 'No',
    creditLimit: 'Credit limit:',
    outstanding: 'Outstanding:',
    availableLOP: 'Available (LOP):',
    minPayment: 'Min payment:',
    mode: 'Mode:',
    tariff: 'Tariff:',
    month: 'month',
    balance: 'Balance:',
    available: 'Available:',
    standingOrders: 'Standing orders:',
    directDebits: 'Direct debits:',
    incoming: 'Incoming:',
    outgoing: 'Outgoing:',
    resolved: 'Resolved',
    open: 'Open',
    location: 'Location:',
    agent: 'Agent:',
    summary: 'Summary',
    notes: 'Notes',
    relatedTicket: 'Related ticket:',
    txCategory: 'Category:',
    txStatus: 'Status:',
    txCurrency: 'Currency:',
    txCompleted: 'Completed',
    txPending: 'Pending',
    txDeclined: 'Declined',
    categories: {
      groceries: 'Groceries',
      e_commerce: 'E-commerce',
      travel: 'Travel',
      dining: 'Dining',
      transport: 'Transport',
      utilities: 'Utilities',
      entertainment: 'Entertainment',
      health: 'Health',
      education: 'Education',
      atm: 'ATM',
      transfer: 'Transfer',
      salary: 'Salary',
      insurance: 'Insurance',
      pension: 'Pension',
      other: 'Other',
    },
  },

  behaviorDetail: {
    title: 'Behavior Detail',
    balanceHistory: 'Balance History (30 days)',
    currentBalance: 'Current balance:',
    thirtyDaysAgo: '30 days ago:',
    change: 'Change:',
    allChannels: 'All Channels',
    interactions: 'interactions',
    recentLogins: 'Recent Logins',
    device: 'Device:',
    intlTransactions: 'International Transactions',
    onlineTransactions: 'Online Transactions',
    merchant: 'Merchant',
    noData: 'No data available',
  },

  satisfaction: {
    title: 'Satisfaction',
    detailTitle: 'Satisfaction Detail',
    latestNps: 'Latest NPS',
    surveyHistory: 'Survey History',
    verbatimFeedback: 'Client Feedback',
    promoter: 'Promoter',
    passive: 'Passive',
    detractor: 'Detractor',
    noScores: 'No satisfaction data',
    score: 'Score',
    survey: 'survey',
    surveys: 'surveys',
  },

  sentiment: {
    positive: 'positive',
    neutral: 'neutral',
    negative: 'negative',
    noData: 'No data',
  },

  dates: {
    today: 'Today',
    yesterday: 'Yesterday',
    daysAgo: (days) => `${days} days ago`,
    oneWeekAgo: '1 week ago',
    weeksAgo: (weeks) => `${weeks} weeks ago`,
    oneMonthAgo: '1 month ago',
    monthsAgo: (months) => `${months} months ago`,
  },

  alerts: {
    birthdayTomorrow: 'Birthday is tomorrow!',
    birthdayIn: (days) => `Birthday in ${days} days`,
    cardExpires: (name) => `${name} expires soon`,
    balanceDrop: (pct) => `Balance dropped ${pct}% in 30 days`,
    unresolvedComplaints: (count) => `${count} unresolved complaint(s)`,
    gdprExpired: 'GDPR consent expired',
    gdprNoConsent: 'No GDPR consent on file',
  },

  login: {
    title: 'Sign In',
    username: 'Username',
    password: 'Password',
    submit: 'Sign In',
    error: 'Invalid credentials',
    logout: 'Log out',
  },

  comments: {
    title: 'Comments',
    allComments: 'All Comments',
    addComment: 'Add Comment',
    editComment: 'Edit Comment',
    noComments: 'No comments yet',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    commentText: 'Comment',
    author: 'Author',
    category: 'Category',
    priority: 'Priority',
    targetAudience: 'For',
    statusLabel: 'Status',
    resolve: 'Resolve',
    reject: 'Reject',
    reopen: 'Reopen',
    openCount: (count) => `${count} open`,
    statusOpen: 'Open',
    statusResolved: 'Resolved',
    statusRejected: 'Rejected',
    catBusiness: 'Business',
    catCustomerWording: 'Customer wording',
    catDataLimitation: 'Data limitation',
    catItFeasibility: 'IT feasibility',
    catComplianceLegal: 'Compliance / legal',
    catUxUi: 'UX / UI',
    catProductIdea: 'Product idea',
    priorityLow: 'Low',
    priorityMedium: 'Medium',
    priorityHigh: 'High',
    priorityNone: 'None',
    audienceBusiness: 'Business',
    audienceIt: 'IT',
    audienceData: 'Data',
    audienceCompliance: 'Compliance',
    audienceProduct: 'Product',
    audienceNone: 'None',
    zoneProducts: 'Products',
    zoneActivity: 'Activity',
    zoneBehavior: 'Behavior',
    zoneSales: 'Sales Tips',
    zoneHeader: 'Client Header',
    zoneAlerts: 'Alerts',
    zoneGeneral: 'General',
    allStatuses: 'All statuses',
    allCategories: 'All categories',
    allZones: 'All zones',
  },

  salesTips: {
    R001: {
      headline: 'Client travels but has no travel insurance',
      reasoning: (count) => `${count} international card transactions in the last 90 days, no active travel insurance product.`,
      action: 'Offer the travel insurance package with card coverage.',
    },
    R002: {
      headline: 'Frequent online shopper without a credit card',
      reasoning: (count) => `${count} e-commerce transactions in the last 90 days, paying by debit card only.`,
      action: 'Suggest a credit card with cashback on online purchases.',
    },
    R003: {
      headline: 'Shops at RB partners but no RB Club',
      reasoning: (count) => `${count} transactions at RB partner merchants without loyalty discounts activated.`,
      action: 'Suggest enrolling in RB Club for partner discounts.',
    },
    R004: {
      headline: 'Satisfied client — suggest referral program',
      reasoning: (score) => `NPS score of ${score}. No referral offer in the last 6 months.`,
      action: 'Present the MUM (Muj ucet, muj tip) referral program.',
    },
    R005: {
      headline: 'Pays external insurance/pension provider',
      reasoning: (merchants) => `Active standing orders to: ${merchants}. Potential consolidation opportunity.`,
      action: 'Suggest reviewing and consolidating insurance/pension with RB products.',
    },
    R006: {
      headline: 'Card expiring soon',
      reasoning: (count) => `${count} card(s) expiring within 30 days.`,
      action: 'Proactively discuss card renewal or upgrade to a premium card.',
    },
    R007: {
      headline: 'Significant balance drop detected',
      reasoning: (pct) => `Account balance decreased by ${pct}% in the last 30 days.`,
      action: 'Check if the client needs financial support or if there is a concern.',
    },
    R008: {
      headline: 'Credit profile improving — consider refinancing',
      reasoning: 'Balance trend is growing while client has an active consumer loan.',
      action: 'Suggest loan refinancing at a better interest rate.',
    },
    R009: {
      headline: 'Birthday approaching — personal greeting',
      reasoning: "Client's birthday is within the next 7 days.",
      action: 'Wish the client a happy birthday. Consider a small gift or benefit.',
    },
    R010: {
      headline: 'Active complaint + declining satisfaction',
      reasoning: 'Client has an unresolved complaint and satisfaction trend is declining. Handle with care.',
      action: 'Acknowledge the issue first. Focus on resolution before any sales approach.',
    },
  },
};

export const cs: Translations = {
  app: {
    brandName: 'CRM Intelligence',
    title: 'CRM Intelligence Helper',
    searchPrompt: 'Vyhledejte klienta pro zahájení',
    loadingClient: 'Načítání dat klienta...',
    productDetail: 'Detail produktu',
    interactionDetail: 'Detail interakce',
    behaviorDetail: 'Detail chování',
    satisfactionDetail: 'Detail spokojenosti',
  },

  search: {
    placeholder: 'Hledat klienta podle jména nebo ID...',
    searching: 'Vyhledávání...',
    noResults: (query) => `Žádní klienti nenalezeni pro „${query}"`,
  },

  header: {
    years: 'let',
    birthday: 'Narozeniny',
    gdprOk: 'GDPR',
    gdprWarning: 'GDPR!',
    lastVisit: 'Poslední návštěva:',
    lastCall: 'Poslední hovor:',
  },

  products: {
    title: 'Produkty',
    moreProducts: (count) => `+${count} dalších produktů`,
    types: {
      mortgage: 'Hypotéka',
      consumer_loan: 'Spotřebitelský úvěr',
      insurance: 'Pojištění',
      pension: 'Penze',
      investment: 'Investice',
      savings_account: 'Spořicí účet',
    },
    renewal: 'Obnova:',
    credit: 'Kreditní',
    debit: 'Debetní',
    availableLOP: 'Disponibilní (LOP)',
    limit: 'Limit:',
    owed: 'Dlužná částka:',
    minPayment: 'Min. splátka:',
    due: 'splatnost',
    revolving: 'Revolvingový',
    transactional: 'Transakční',
    exp: 'Platnost:',
    last: 'Poslední:',
    daily: 'Denní:',
    threeDS: '3DS',
    pay: 'Pay',
    declined: (count) => `${count} zamítnuto`,
    standingOrders: 'Trvalé příkazy:',
    directDebits: 'Inkasa:',
    in_: 'Příjem:',
    out_: 'Výdaj:',
    mo: '/měs.',
  },

  status: {
    active: 'Aktivní',
    closed: 'Uzavřený',
    suspended: 'Pozastavený',
  },

  segments: {
    standard: 'Standard',
    affluent: 'Affluent',
    premium: 'Premium',
  },

  channels: {
    branch: 'Pobočka',
    call_center: 'Call Centrum',
    chat: 'Chat',
    email: 'E-mail',
    voicebot: 'Voicebot',
    chatbot: 'Chatbot',
    mobile_app: 'Mobilní aplikace',
    internet_banking: 'Internetové bankovnictví',
  },

  channelsShort: {
    branch: 'Pobočka',
    call_center: 'Telefon',
    mobile_app: 'Mobil',
    internet_banking: 'Web',
    chat: 'Chat',
    email: 'E-mail',
    voicebot: 'Hlas',
    chatbot: 'Bot',
  },

  activity: {
    title: 'Nedávná aktivita',
    noInteractions: 'Žádné nedávné interakce',
    open: 'Otevřeno',
    showMore: (count) => `+${count} dalších interakcí`,
  },

  behavior: {
    title: 'Chování',
    channelPreference: 'Preferovaný kanál',
    balanceTrend: 'Trend zůstatku',
    growing: 'Rostoucí',
    stable: 'Stabilní',
    declining: 'Klesající',
    per30d: '% / 30d',
    digitalEngagement: 'Digitální zapojení',
    low: 'Nízké',
    medium: 'Střední',
    high: 'Vysoké',
    logins30d: (count) => `${count} přihlášení/30d`,
    intlActivity: 'Mezinárodní akt.',
    tx: (count) => `${count} tx`,
    none: 'Žádné',
    ninetyDays: '90 dní',
    onlineShopping: 'Online nákupy',
  },

  sales: {
    title: 'Obchodní tipy',
    noRecommendations: 'Žádná doporučení v tuto chvíli',
    rules: 'Pravidla',
    ml: 'ML',
    priorityHigh: 'Vysoká',
    priorityMed: 'Střední',
    priorityLow: 'Nízká',
    showAction: 'Zobrazit akci',
  },

  slideout: {
    closePanel: 'Zavřít panel',
    loadingProduct: 'Načítání detailů produktu...',
    productNotFound: 'Produkt nenalezen',
    loadingInteraction: 'Načítání interakce...',
    interactionNotFound: 'Interakce nenalezena',
    opened: 'Otevřeno:',
    expires: 'Expirace:',
    recentTransactions: 'Nedávné transakce',
    intl: 'mezinár.',
    cardNumber: 'Číslo karty:',
    variant: 'Varianta:',
    dailyLimit: 'Denní limit',
    monthlyLimit: 'Měsíční limit',
    threeDSecure: '3D Secure:',
    applePay: 'Apple Pay:',
    googlePay: 'Google Pay:',
    approvalRate: 'Úspěšnost:',
    on: 'ZAP',
    off: 'VYP',
    yes: 'Ano',
    no: 'Ne',
    creditLimit: 'Kreditní limit:',
    outstanding: 'Čerpaná částka:',
    availableLOP: 'Disponibilní (LOP):',
    minPayment: 'Min. splátka:',
    mode: 'Režim:',
    tariff: 'Tarif:',
    month: 'měsíc',
    balance: 'Zůstatek:',
    available: 'Disponibilní:',
    standingOrders: 'Trvalé příkazy:',
    directDebits: 'Inkasa:',
    incoming: 'Příchozí:',
    outgoing: 'Odchozí:',
    resolved: 'Vyřešeno',
    open: 'Otevřeno',
    location: 'Místo:',
    agent: 'Pracovník:',
    summary: 'Shrnutí',
    notes: 'Poznámky',
    relatedTicket: 'Související tiket:',
    txCategory: 'Kategorie:',
    txStatus: 'Stav:',
    txCurrency: 'Měna:',
    txCompleted: 'Dokončeno',
    txPending: 'Probíhá',
    txDeclined: 'Zamítnuto',
    categories: {
      groceries: 'Potraviny',
      e_commerce: 'E-commerce',
      travel: 'Cestování',
      dining: 'Stravování',
      transport: 'Doprava',
      utilities: 'Služby',
      entertainment: 'Zábava',
      health: 'Zdraví',
      education: 'Vzdělávání',
      atm: 'Bankomat',
      transfer: 'Převod',
      salary: 'Mzda',
      insurance: 'Pojištění',
      pension: 'Penze',
      other: 'Ostatní',
    },
  },

  behaviorDetail: {
    title: 'Detail chování',
    balanceHistory: 'Historie zůstatku (30 dní)',
    currentBalance: 'Aktuální zůstatek:',
    thirtyDaysAgo: 'Před 30 dny:',
    change: 'Změna:',
    allChannels: 'Všechny kanály',
    interactions: 'interakcí',
    recentLogins: 'Nedávná přihlášení',
    device: 'Zařízení:',
    intlTransactions: 'Mezinárodní transakce',
    onlineTransactions: 'Online transakce',
    merchant: 'Obchodník',
    noData: 'Žádná data',
  },

  satisfaction: {
    title: 'Spokojenost',
    detailTitle: 'Detail spokojenosti',
    latestNps: 'Poslední NPS',
    surveyHistory: 'Historie průzkumů',
    verbatimFeedback: 'Zpětná vazba klienta',
    promoter: 'Promotér',
    passive: 'Pasivní',
    detractor: 'Detraktor',
    noScores: 'Žádná data o spokojenosti',
    score: 'Skóre',
    survey: 'průzkum',
    surveys: 'průzkumů',
  },

  sentiment: {
    positive: 'pozitivní',
    neutral: 'neutrální',
    negative: 'negativní',
    noData: 'Bez dat',
  },

  dates: {
    today: 'Dnes',
    yesterday: 'Včera',
    daysAgo: (days) => `před ${days} dny`,
    oneWeekAgo: 'před 1 týdnem',
    weeksAgo: (weeks) => `před ${weeks} týdny`,
    oneMonthAgo: 'před 1 měsícem',
    monthsAgo: (months) => `před ${months} měsíci`,
  },

  alerts: {
    birthdayTomorrow: 'Narozeniny jsou zítra!',
    birthdayIn: (days) => `Narozeniny za ${days} dní`,
    cardExpires: (name) => `${name} brzy expiruje`,
    balanceDrop: (pct) => `Zůstatek klesl o ${pct} % za 30 dní`,
    unresolvedComplaints: (count) => `${count} nevyřešená stížnost(i)`,
    gdprExpired: 'Souhlas GDPR vypršel',
    gdprNoConsent: 'Chybí souhlas GDPR',
  },

  login: {
    title: 'Přihlášení',
    username: 'Uživatelské jméno',
    password: 'Heslo',
    submit: 'Přihlásit',
    error: 'Neplatné přihlašovací údaje',
    logout: 'Odhlásit',
  },

  comments: {
    title: 'Komentáře',
    allComments: 'Všechny komentáře',
    addComment: 'Přidat komentář',
    editComment: 'Upravit komentář',
    noComments: 'Zatím žádné komentáře',
    save: 'Uložit',
    cancel: 'Zrušit',
    delete: 'Smazat',
    commentText: 'Komentář',
    author: 'Autor',
    category: 'Kategorie',
    priority: 'Priorita',
    targetAudience: 'Pro',
    statusLabel: 'Stav',
    resolve: 'Vyřešit',
    reject: 'Zamítnout',
    reopen: 'Znovu otevřít',
    openCount: (count) => `${count} otevřených`,
    statusOpen: 'Otevřený',
    statusResolved: 'Vyřešený',
    statusRejected: 'Zamítnutý',
    catBusiness: 'Byznys',
    catCustomerWording: 'Zákaznická formulace',
    catDataLimitation: 'Datové omezení',
    catItFeasibility: 'IT proveditelnost',
    catComplianceLegal: 'Compliance / právní',
    catUxUi: 'UX / UI',
    catProductIdea: 'Produktový nápad',
    priorityLow: 'Nízká',
    priorityMedium: 'Střední',
    priorityHigh: 'Vysoká',
    priorityNone: 'Žádná',
    audienceBusiness: 'Byznys',
    audienceIt: 'IT',
    audienceData: 'Data',
    audienceCompliance: 'Compliance',
    audienceProduct: 'Produkt',
    audienceNone: 'Žádná',
    zoneProducts: 'Produkty',
    zoneActivity: 'Aktivita',
    zoneBehavior: 'Chování',
    zoneSales: 'Obchodní tipy',
    zoneHeader: 'Hlavička klienta',
    zoneAlerts: 'Upozornění',
    zoneGeneral: 'Obecné',
    allStatuses: 'Všechny stavy',
    allCategories: 'Všechny kategorie',
    allZones: 'Všechny zóny',
  },

  salesTips: {
    R001: {
      headline: 'Klient cestuje, ale nemá cestovní pojištění',
      reasoning: (count) => `${count} mezinárodních karetních transakcí za posledních 90 dní, žádný aktivní produkt cestovního pojištění.`,
      action: 'Nabídněte balíček cestovního pojištění s krytím karty.',
    },
    R002: {
      headline: 'Častý online nakupující bez kreditní karty',
      reasoning: (count) => `${count} e-commerce transakcí za posledních 90 dní, platba pouze debetní kartou.`,
      action: 'Navrhněte kreditní kartu s cashbackem na online nákupy.',
    },
    R003: {
      headline: 'Nakupuje u partnerů RB, ale nemá RB Club',
      reasoning: (count) => `${count} transakcí u partnerských obchodníků RB bez aktivace věrnostních slev.`,
      action: 'Navrhněte registraci do RB Club pro partnerské slevy.',
    },
    R004: {
      headline: 'Spokojený klient — navrhnout doporučující program',
      reasoning: (score) => `NPS skóre ${score}. Žádná nabídka doporučení za posledních 6 měsíců.`,
      action: 'Představte doporučující program MUM (Můj účet, můj tip).',
    },
    R005: {
      headline: 'Platí externímu poskytovateli pojištění/penze',
      reasoning: (merchants) => `Aktivní trvalé příkazy na: ${merchants}. Příležitost ke konsolidaci.`,
      action: 'Navrhněte přehodnocení a konsolidaci pojištění/penze s produkty RB.',
    },
    R006: {
      headline: 'Karta brzy expiruje',
      reasoning: (count) => `${count} karet(a) s expirací do 30 dnů.`,
      action: 'Proaktivně prodiskutujte obnovu karty nebo upgrade na prémiovou kartu.',
    },
    R007: {
      headline: 'Zjištěn výrazný pokles zůstatku',
      reasoning: (pct) => `Zůstatek na účtu klesl o ${pct} % za posledních 30 dní.`,
      action: 'Ověřte, zda klient nepotřebuje finanční podporu.',
    },
    R008: {
      headline: 'Kreditní profil se zlepšuje — zvážit refinancování',
      reasoning: 'Trend zůstatku je rostoucí, zatímco klient má aktivní spotřebitelský úvěr.',
      action: 'Navrhněte refinancování úvěru s lepší úrokovou sazbou.',
    },
    R009: {
      headline: 'Blíží se narozeniny — osobní pozdrav',
      reasoning: 'Narozeniny klienta jsou do 7 dnů.',
      action: 'Popřejte klientovi k narozeninám. Zvažte malý dárek nebo benefit.',
    },
    R010: {
      headline: 'Aktivní stížnost + klesající spokojenost',
      reasoning: 'Klient má nevyřešenou stížnost a trend spokojenosti klesá. Jednejte opatrně.',
      action: 'Nejdříve uznejte problém. Zaměřte se na vyřešení před obchodním přístupem.',
    },
  },
};

export const translations: Record<Language, Translations> = { en, cs };
