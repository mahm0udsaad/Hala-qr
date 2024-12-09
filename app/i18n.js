import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18next from "i18next";
const resources = {
  en: {
    translation: {
      editProfile: "Edit Profile",
      notifications: "Notifications",
      faq: "Frequently Asked Questions",
      paymentInfo: "Payment Information",
      contactUs: "Contact Us",
      signOut: "Sign Out",
      package: "Package",
      termsOfService: "Terms of Service",
      privacyPolicy: "Privacy Policy",
      home: "Home",
      events: "Events",
      add: "Add",
      messages: "Messages",
      profile: "Profile",
      helloUser: "Hello {{name}} !",
      signIn: "Sign in",
      allSet: "Now that you are all set.",
      extraordinaryEvents:
        "Let's make your events extraordinary, starting right here!",
      planEvent: "Plan an Event",
      invitations: "Invitations",
      noInvitations: "No Invitations",
      noInvitationsText:
        "No invitations received? Take charge and plan your own event with EventJoy. It's easy and fun!",
      upcomingEvents: "Upcoming Events",
      noEvents: "No Events",
      noEventsText:
        "Your event calendar is a blank canvas. Use EventJoy to paint it with memorable moments.",
      thisMonth: "This Month",
      createNewDesign: "Create New Design",
      whiteboard: "Whiteboard",
      templates: "Templates",
      welcomeBack: "Welcome Back",
      error: "Error",
      enterEmailOrMobile: "Please enter either email or mobile number.",
      email: "Email",
      phoneNumber: "Phone Number",
      signIn: "Sign In",
      usePhoneNumber: "Use Phone Number",
      useEmail: "Use Email",
      continueWith: "Or continue with",
      noAccount: "Don't have an account?",
      signUp: "Sign Up",
    },
  },
  ar: {
    translation: {
      editProfile: "تعديل الملف الشخصي",
      notifications: "الإشعارات",
      faq: "الأسئلة الشائعة",
      paymentInfo: "معلومات الدفع",
      contactUs: "اتصل بنا",
      signOut: "تسجيل الخروج",
      package: "الباقة",
      termsOfService: "شروط الخدمة",
      privacyPolicy: "سياسة الخصوصية",
      home: "الرئيسية",
      events: "الأحداث",
      add: "إضافة",
      messages: "الرسائل",
      profile: "الملف الشخصي",
      helloUser: "مرحباً {{name}} !",
      signIn: "تسجيل الدخول",
      allSet: "أنت جاهز الآن.",
      extraordinaryEvents: "لنبدأ في جعل مناسباتك استثنائية!",
      planEvent: "خطط لفعالية",
      invitations: "الدعوات",
      noInvitations: "لا توجد دعوات",
      noInvitationsText:
        "لم تتلقَ أي دعوات؟ ابدأ بتنظيم فعاليتك الخاصة مع EventJoy بسهولة ومتعة!",
      upcomingEvents: "الفعاليات القادمة",
      noEvents: "لا توجد فعاليات",
      noEventsText:
        "جدول مناسباتك فارغ. استخدم EventJoy لملئه بلحظات لا تُنسى.",
      thisMonth: "هذا الشهر",
      // New translations
      createNewDesign: "إنشاء تصميم جديد",
      whiteboard: "ابدا من جديد",
      templates: "القوالب",
      welcomeBack: "مرحباً بعودتك",
      error: "خطأ",
      enterEmailOrMobile: "يرجى إدخال البريد الإلكتروني أو رقم الهاتف.",
      email: "البريد الإلكتروني",
      phoneNumber: "رقم الهاتف",
      signIn: "تسجيل الدخول",
      usePhoneNumber: "استخدام رقم الهاتف",
      useEmail: "استخدام البريد الإلكتروني",
      continueWith: "أو تابع باستخدام",
      noAccount: "ليس لديك حساب؟",
      signUp: "تسجيل",
    },
  },
};

const getStoredLanguage = async () => {
  const savedLanguage = await AsyncStorage.getItem("language");
  return savedLanguage || "en";
};
export const isRTL = i18next.language;
getStoredLanguage().then((language) => {
  i18n.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
});

export default i18n;
