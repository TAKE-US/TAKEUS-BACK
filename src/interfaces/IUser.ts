export interface ISocialUser {
  identiity: string;
  social: string;
  createdDate: Date;
  lastLoginDate: Date;
}

export interface ISocialUserInputDTO {
  identity: string;
}

export interface IUser {
  email: string;
  password: string;
  date: Date;
  lastLoginDate: Date;
}

export interface IUserInputDTO {
  email: string;
  password: string;
}

/**
 * 사용자 인증에 필요한 것 : 계정 -> ID.
 * 소셜 로그인에 성공했을 때 받는 것 -> AccessToken, RefreshToken
 * AccessToken : 카카오, 구글에서 사용자의 정보를 받아오는데 필요한 토큰
 * RefreshToken : 상대적으로 만료기간이 짧은 AccessToken을 재발급 받을 수 있는 토큰.
 *
 * 절차.
 * 로그인 시 클라이언트로부터 AccessToken과 RefreshToken을 클라이언트로부터 받는다.
 * AccessToken을 사용하여 구글, 카카오, 네이버로부터 사용자의 ID 정보를 가져온다. 구글 -> email, 카카오 -> 이메일 or 닉네임, 네이버 -> 이메일
 * 사용자의 ID정보에 맞는 계정이 없다면 사용하여 Takeus의 계정을 생성한 뒤, jwt 토큰을 발행한다.
 * 사용자의 ID정보에 맞는 계정이 있다면, jwt 토큰을 발행한다.
 * 클라이언트에게 jwt 토큰을 전달해준다.
 * 클라이언트는 request의 Header에 x-auth-token 이라는 항목에 jwt토큰을 추가하여 권한이 필요한 API들을 호출할 수 있다.
 *
 *
 */
