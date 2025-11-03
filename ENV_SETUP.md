# 환경변수 설정 가이드

## 배포 시 필요한 환경변수

배포 플랫폼(Vercel, Netlify 등)에서 다음 환경변수들을 설정해야 합니다.

### 1. 데이터베이스 연결 (Supabase)

```
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-[REGION].pooler.supabase.com:5432/postgres
```

**가져오는 방법:**

1. Supabase 대시보드 접속
2. Project Settings → Database → Connection String
3. "Transaction" 모드 URL 복사 → `DATABASE_URL`
4. "Direct" 모드 URL 복사 → `DIRECT_URL`

### 2. S3 스토리지 (Supabase Storage)

```
S3_ENDPOINT=https://[PROJECT-REF].storage.supabase.co/storage/v1/s3
S3_REGION=ap-northeast-2
S3_ACCESS_KEY_ID=your_access_key
S3_SECRET_ACCESS_KEY=your_secret_key
STORAGE_BUCKET=goat_data
```

**가져오는 방법:**

1. Supabase 대시보드 접속
2. Storage → Settings → S3 Access Keys
3. "Create new access key" 클릭
4. 생성된 키들을 복사

### 3. 관리자 인증

```
ADMIN_PASSWORD=your_secure_16char_password
```

**설정:**

- 16자 이상의 안전한 비밀번호 설정
- 예: `K8mX9pQr2NvL5wYt`

### 4. 선택사항

```
STORAGE_CACHE_TTL_MS=300000
```

## Vercel 배포 시

1. Vercel 대시보드에서 프로젝트 선택
2. Settings → Environment Variables
3. 위 환경변수들을 하나씩 추가
4. Production, Preview, Development 환경 선택
5. Save

## Netlify 배포 시

1. Netlify 대시보드에서 사이트 선택
2. Site settings → Environment variables
3. "Add a variable" 클릭
4. 위 환경변수들을 하나씩 추가

## 로컬 개발 시

`.env.example` 파일을 복사해서 `.env` 파일 생성:

```bash
cp .env.example .env
```

그리고 실제 값으로 수정하세요.
