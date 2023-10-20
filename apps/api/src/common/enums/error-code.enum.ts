export enum ErrorCode {
  // common
  RELATION_ID_CANNOT_BE_ZERO = 999999,
  UNKNOWN_ERROR = 999998,

  // auth
  INVALID_CREDENTIALS = 1000,
  INVALID_ACCESS_TOKEN = 1001,
  ACCESS_TOKEN_IS_EXPIRED = 1002,

  // security
  INVALID_PASSWORD = 2000,

  // role
  ROLE_NOT_FOUND = 3000,
  ROLE_ALREADY_EXISTS = 3001,

  // permission
  PERMISSION_NOT_FOUND = 4100,

  // user
  USER_NOT_FOUND = 5000,
  USER_ALREADY_EXISTS = 5001,
  USER_PHONE_NUMBER_ALREADY_EXIST = 5002,
  USER_EMAIL_ALREADY_EXIST = 5003,
  USER_DOES_NOT_HAVE_COMPANY = 5004,
  USER_MUST_HAVE_COMPANY_TO_CREATE_JOB = 5005,

  // tag
  TAG_DOES_NOT_EXIST = 6000,

  // level
  LEVEL_DOES_NOT_EXIST = 7000,
  LEVEL_NAME_ALREADY_EXIST = 7001,

  // job-type
  JOB_TYPE_DOES_NOT_EXIST = 8000,
  JOB_TYPE_NAME_ALREADY_EXIST = 8001,

  // location
  LOCATION_DOES_NOT_EXIST = 9000,

  // currency
  CURRENCY_DOES_NOT_EXIST = 10000,
  CURRENCY_NAME_ALREADY_EXIST = 10001,

  // payment-type
  PAYMENT_TYPE_DOES_NOT_EXIST = 11000,

  // job
  JOB_DOES_NOT_EXIST = 12000,
  JOB_MIN_SALARY_MUST_BE_LESS_THAN_MAX_SALARY = 12001,

  // company
  COMPANY_NOT_FOUND = 13000,
  COMPANY_NAME_ALREADY_EXIST = 13001,

  // // currency exchange
  // FromCurrencyDoesNotExist = 7000,
  // ToCurrencyDoesNotExist = 7001,
  // FromAndToCurrencyCannotBeTheSame = 7002,
  // CurrencyExchangeDoesNotExist = 7003,
  // FromAndToCurrencyAlreadyExist = 7004,
  //
  // // room
  // RoomNameAlreadyExist = 8000,
  // RoomDoesNotExist = 8001,
  // CannotUpdateRoomStatus = 8002,
  // RoomAlreadyBookedMustCancelFirst = 8003,
  // RoomIsNotBooked = 8004,
  //
  // // top level category
  // TopLevelCategoryNameAlreadyExist = 9000,
  // TopLevelCategoryDoesNotExist = 9001,
  // CannotDeleteTopLevelCategoryThatHaveRelationWithCategory = 9002,
  //
  // // category
  // CategoryNameAlreadyExist = 10000,
  // CategoryDoesNotExist = 10001,
  //
  // // brand
  // BrandNameAlreadyExist = 110001,
  // BrandDoesNotExist = 110002,
  //
  // // warehouse
  // WarehouseNameAlreadyExist = 120000,
  // WarehouseManagerDoesNotExist = 120001,
  // WarehouseDoesNotExist = 120002,
  //
  // // supplier
  // SupplierNameAlreadyExist = 130001,
  // SupplierDoesNotExist = 130002,
  //
  // // base unit
  // BaseUnitNameAlreadyExist = 140000,
  // BaseUnitDoesNotExist = 140001,
  //
  // // related unit
  // RelatedUnitNameAlreadyExist = 150000,
  // RelatedUnitDoesNotExist = 150001,
  // MustDeleteProductCustomizeFirst = 150002,
  //
  // // product customize
  // ProductCustomizeDoesNotExist = 160000,
  // ProductDoesNotExist = 160001,
  // ProductBarcodeAlreadyExist = 160002,
}
