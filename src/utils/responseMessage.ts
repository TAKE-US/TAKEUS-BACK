const RM = {
    INTERNAL_SERVER_ERROR : "Internal Server Error!",
    FAIL_TO_IMAGE_UPLOAD : "Internal Error : fail to upload image!",

    DOG_NOT_FOUND : "Dog Not Found",
    REVIEW_NOT_FOUND : "Review Not Found",
    INVALID_LOGIN_REQUEST : "Invalid Access Token or Social",
    INVALID_TOKEN : "Token is not valid",
    NO_TOKEN : "No token",
    NO_CODE_STATE : "No code or state",

    NO_CONTENTS : "The required information is missing.",

    NULL_VALUE : "Null value is in request body",
    NULL_VALUE_USER : "There is no user or targetUser in the request body.",
    NULL_VALUE_TARGET : "There is no TargetDog or targetReview in the request body.",
    INVALID_DOG_ID : "Dog id is not valid.",
    INVALID_REVIEW_ID : "Review id is not valid",
    DUPLICATE_REPORT : "It's a duplicate report.",
    STATUS_NOT_VALID : "Status is not valid",
    NO_AUTHENTICATED : "Not authenticated",

    NO_EMAIL_AGREEMENT : "Can't find email. Please check if you have agreed to the email",

    INVALID_CONTENT_TYPE : "request header's content-type is not multipart/form-data"
};

export { RM };