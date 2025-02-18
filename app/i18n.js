import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18next from "i18next";
const resources = {
  en: {
    translation: {
      editProfileTitle: "Edit Profile",
      save: "Save",
      firstName: "First Name",
      lastName: "Last Name",
      email: "E-mail",
      profileUpdateSuccess: "Profile updated successfully",
      profileUpdateError: "Failed to update profile",
      signInRequired: "Sign In Required",
      pleaseSignInToAccessProfile: "Please sign in to access your profile",
      signIn: "Sign In",
      termsOfService: "Terms of Service",
      privacyPolicy: "Privacy Policy",
      premium: {
        title: "Go Premium",
        subtitle:
          "Unlock premium features and take your events to the next level.",
        startNow: "Start 30-day now",
        terms: "By placing this order, you agree to the",
        termsOfService: "Terms of Service",
        privacyPolicy: "Privacy Policy",
        dayes: "Days",
        cta: "Start now for",
        cta_default: "Start now",
        subscriptionNote:
          "Subscription automatically renews unless auto-renew is turned off at least 24 hours before the end of the current period.",
      },
      contactUs: "Contact Us",
      getInTouch: "Get in Touch",
      contactUsDescription:
        "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      name: "Name",
      enterYourName: "Enter your name",
      email: "Email",
      enterYourEmail: "Enter your email",
      phone: "Phone",
      enterYourPhone: "Enter your phone number",
      message: "Message",
      enterYourMessage: "Write your message here",
      submit: "Submit",
      followUs: "Follow Us",
      editProfile: "Edit Profile",
      notifications: "Notifications",
      faq: "Frequently Asked Questions",
      paymentInfo: "Payment Information",
      contactUs: "Contact Us",
      signOut: "Sign Out",
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
        "No invitations received? Take charge and plan your own event with HalaQr. It's easy and fun!",
      upcomingEvents: "Upcoming Events",
      noEvents: "No Events",
      noEventsText:
        "Your event calendar is a blank canvas. Use HalaQr to paint it with memorable moments.",
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
      day: "Day",
      usePhoneNumber: "Use Phone Number",
      useEmail: "Use Email",
      continueWith: "Or continue with",
      noAccount: "Don't have an account?",
      signUp: "Sign Up",
      package: {
        title: "Package",
        oldPrice: "Old Price",
        designs: "Designs",
        invitations: "Invitations",
        designPrice: "Design Price",
        invitationPrice: "Invitation Price",
        duration: "Duration",
        enterCouponCode: "Enter Coupon Code",
        proceedToCheckout: "Proceed to Checkout",
        apply: "Apply",
      },
      couponDiscount: "Coupon Discount",
      discountedTotal: "Discounted Total",
      enterOtp: "Enter OTP",
      verifyOtp: "Verify OTP",
      resendOtp: "Resend OTP",
      mobile: "Mobile",
      Success: "Success",
    },
  },
  ar: {
    translation: {
      privacyPolicy: "سياسة الخصوصية",
      termsOfService: "شروط الخدمة",
      couponDiscount: "خصم القسيمة",
      discountedTotal: "الإجمالي المخفض",
      editProfileTitle: "تعديل الملف الشخصي",
      save: "حفظ",
      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      email: "البريد الإلكتروني",
      profileUpdateSuccess: "تم تحديث الملف الشخصي بنجاح",
      profileUpdateError: "فشل تحديث الملف الشخصي",
      signInRequired: "تسجيل الدخول مطلوب",
      pleaseSignInToAccessProfile: "يرجى تسجيل الدخول للوصول إلى ملفك الشخصي",
      signIn: "تسجيل الدخول",
      day: "يوم",
      Success: "تم بنجاح",
      premium: {
        title: "انتقل للمميز",
        subtitle: "فتح ميزات مميزة والوصول إلى مستوى جديد من الفعاليات.",
        startNow: "ابدأ الآن لمدة 30 يومًا",
        terms: "بالنقر على هذا الطلب، فإنك توافق على",
        termsOfService: "شروط الخدمة",
        privacyPolicy: "سياسة الخصوصية",
        days: "أيام",
        cta: "ابدأ الآن لمدة ",
        cta_default: "ابدأ الآن",
        subscriptionNote:
          "يتم تجديد الاشتراك تلقائيًا ما لم يتم إيقاف التجديد التلقائي قبل 24 ساعة على الأقل من نهاية الفترة الحالية.",
      },
      contactUs: "اتصل بنا",
      getInTouch: "تواصل معنا",
      contactUsDescription:
        "نود أن نسمع منك. أرسل لنا رسالة وسنرد في أقرب وقت ممكن.",
      name: "الاسم",
      enterYourName: "أدخل اسمك",
      email: "البريد الإلكتروني",
      enterYourEmail: "أدخل بريدك الإلكتروني",
      phone: "الهاتف",
      enterYourPhone: "أدخل رقم هاتفك",
      message: "الرسالة",
      enterYourMessage: "اكتب رسالتك هنا",
      submit: "إرسال",
      followUs: "تابعنا",
      editProfile: "تعديل الملف الشخصي",
      notifications: "الإشعارات",
      faq: "الأسئلة الشائعة",
      paymentInfo: "معلومات الدفع",
      contactUs: "اتصل بنا",
      signOut: "تسجيل الخروج",
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
        "لم تتلقَ أي دعوات؟ ابدأ بتنظيم فعاليتك الخاصة مع HalaQr بسهولة ومتعة!",
      upcomingEvents: "الفعاليات القادمة",
      noEvents: "لا توجد فعاليات",
      noEventsText: "جدول مناسباتك فارغ. استخدم HalaQr لملئه بلحظات لا تُنسى.",
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
      enterCouponCode: "أدخل رمز القسيمة",
      proceedToCheckout: "المتابعة إلى الدفع",
      apply: "تطبيق",
      mobile: "رقم الهاتف",
      package: {
        title: "الباقة",
        oldPrice: "السعر القديم",
        designs: "التصاميم",
        invitations: "الدعوات",
        designPrice: "سعر التصميم",
        invitationPrice: "سعر الدعوة",
        duration: "المدة",
      },
      enterOtp: "أدخل رمز التحقق",
      verifyOtp: "تحقق من الرمز",
      resendOtp: "أعد إرسال الرمز",
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
