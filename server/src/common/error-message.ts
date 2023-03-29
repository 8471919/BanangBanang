export const ERROR_MESSAGE = {
  FAIL_TO_CREATE_USER: { code: 400, message: '회원가입에 실패했어요!' },
  FAIL_TO_FIND_EMAIL: { code: 401, message: '등록된 이메일이 아닙니다.' },
  FAIL_TO_LOGIN: { code: 403, message: '이메일에 맞는 비밀번호가 아닙니다.' },
  FAIL_TO_REGISTER_EMAIL: { code: 402, message: '이미 가입된 이메일입니다.' },
  FAIL_TO_GOOGLE_LOGIN: { code: 400, message: '해당 유저를 찾을 수 없습니다.' },
  //article
  FAIL_TO_JOB_POSTING: { code: 400, message: 'JOB POSTING에 실패했어요!' },
  //articleRepository
  FAIL_TO_GET_ARTICLE: {
    code: 400,
    message: '게시글 목록을 불러오지 못했습니다.',
  },
  FAIL_TO_DELETE_ARTICLE: {
    code: 400,
    message: '게시글 삭제를 실패하였습니다.',
  },
};
