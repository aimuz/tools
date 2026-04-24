import type { Translations } from '../schema';

export const ko = {
  common: {
    siteName: 'WizGo',
    siteTagline:
      'WizGo는 무료 온라인 도구 모음입니다: 이미지 압축, 형식 변환, JWT, 타임스탬프 등 개발자 일상 도구. 모두 브라우저에서 처리, 업로드 없음.',
    aboutLink: '소개',
    menuButtonAria: '메뉴',
    languageSwitcherAria: '언어 전환',
    scripts: {
      loading: '로딩 중, 잠시 후 다시 시도해 주세요',
      processing: '처리 중...',
      processingFailedTemplate: '실패: {name}',
      convertFailedTemplate: '변환 실패: {name}',
      savedPercentTemplate: '· {pct}% 절감',
      optimized: '· 이미 최적화됨',
      copyBtn: '복사',
      downloadBtn: '다운로드',
      copying: '복사 중...',
      copied: '복사됨',
      copyFailed: '복사 실패',
      startCompress: '압축 시작',
      startConvert: '변환 시작',
      autoDetect: '자동 감지',
      canvasError: 'canvas 컨텍스트를 만들 수 없습니다',
      parseImageError: '이미지를 분석할 수 없습니다. 다른 이미지를 시도하세요',
      needImageFirst: '먼저 이미지를 업로드하세요',
      needText: '삽입할 텍스트를 입력하세요',
      noWatermark: '워터마크가 감지되지 않음',
      capacityHintTemplate: '삽입 가능 {bytes} 바이트 · 약 {chars}자',
      capacityErrorTemplate:
        '이미지 용량 부족, 최대 {cap} 바이트 (현재 텍스트 {len} 바이트)',
      imageTooSmallDct:
        '이미지가 너무 작습니다. DCT 알고리즘은 최소 128×128 픽셀 필요',
      imageTooSmallLsb:
        '이미지가 너무 작아 워터마크를 삽입할 수 없습니다 (최소 약 32×32 픽셀 필요)',
      clipboardNotSupported: '이 브라우저는 클립보드 API를 지원하지 않습니다',
      pngGenerationFailed: 'PNG 생성 실패',
      audioDecodeFailed:
        '오디오를 디코딩할 수 없습니다. 다른 파일을 시도하거나 Chrome / Firefox를 사용하세요',
      audioEncodeFailed: '오디오 인코딩 실패',
      compareBtn: '비교',
      compareBefore: '원본',
      compareAfter: '결과',
    },
  },
  nav: {
    image: {
      label: '이미지 도구',
      items: {
        compress: { name: '이미지 압축', desc: 'PNG / JPG / WebP 스마트 압축' },
        convert: {
          name: '이미지 형식 변환',
          desc: 'PNG JPG WebP GIF BMP 상호 변환',
        },
        'png-to-jpg': {
          name: 'PNG → JPG',
          desc: '투명 배경 흰색 채움 · 더 작은 용량',
        },
        'jpg-to-png': { name: 'JPG → PNG', desc: '무손실 저장 · 투명도 지원' },
        'png-to-webp': { name: 'PNG → WebP', desc: '투명 유지 · 더 작은 용량' },
        'jpg-to-webp': { name: 'JPG → WebP', desc: '같은 화질로 25-35% 축소' },
        watermark: { name: '이미지 숨김 워터마크', desc: '텍스트 삽입 / 추출' },
        'text-watermark': {
          name: '이미지 텍스트 워터마크',
          desc: '제출용 · 도용 방지 워터마크',
        },
      },
    },
    dev: {
      label: '개발자 도구',
      items: {
        jwt: { name: 'JWT 디코드/검증', desc: '분석, 생성, 서명 검증' },
        timestamp: { name: '타임스탬프 변환', desc: 'Unix 타임스탬프 ↔ 날짜' },
        json: { name: 'JSON 포매터', desc: '미화 / 압축 / 검증' },
        'code-image': { name: '코드 이미지화', desc: '코드 공유 이미지 생성' },
        base64: {
          name: 'Base64 인코딩/디코딩',
          desc: '텍스트/파일 인코딩 및 디코딩',
        },
        uuid: { name: 'UUID 생성', desc: '고유 식별자 일괄 생성' },
        'url-encode': {
          name: 'URL 인코딩/디코딩',
          desc: 'URL 특수 문자 인코딩',
        },
        color: { name: '색상 변환', desc: 'HEX, RGB, HSL 상호 변환' },
        qrcode: { name: 'QR 코드 생성기', desc: '텍스트/링크로 QR 코드 생성' },
        hash: {
          name: '해시 생성기',
          desc: 'SHA-1 / SHA-256 / SHA-384 / SHA-512 체크섬',
        },
        password: {
          name: '비밀번호 생성기',
          desc: '강력한 무작위 비밀번호 생성',
        },
      },
    },
    media: {
      label: '미디어 도구',
      items: {
        'mp4-to-mp3': {
          name: 'MP4 → MP3',
          desc: '동영상 파일에서 오디오 추출',
        },
        'compress-mp3': {
          name: 'MP3 압축',
          desc: '비트레이트 낮춰 MP3 크기 줄이기',
        },
      },
    },
    document: {
      label: '문서 도구',
      items: {
        'pdf-compress': { name: 'PDF 압축', desc: 'PDF 파일 크기 줄이기' },
        'pdf-merge': { name: 'PDF 병합', desc: '여러 PDF를 하나로 합치기' },
      },
    },
  },
  quickActions: {
    'png-compress': {
      name: 'PNG 압축',
      description: '스마트 압축 · 60-80% 축소',
      tags: ['PNG 압축', 'PNG compress', 'pngquant', '이미지 압축'],
    },
    'jpg-compress': {
      name: 'JPG 압축',
      description: '사진 압축 · 30-45% 축소',
      tags: ['JPG 압축', 'JPEG 압축', 'JPG compress', '이미지 압축'],
    },
    'webp-compress': {
      name: 'WebP 압축',
      description: '무손실 압축 · 투명 유지',
      tags: ['WebP 압축', 'WebP compress'],
    },
    'png-to-jpg': {
      name: 'PNG → JPG',
      description: '투명 배경 흰색 채움 · 더 작은 용량',
      tags: ['PNG to JPG', 'PNG to JPEG', 'png to jpg'],
    },
    'jpg-to-png': {
      name: 'JPG → PNG',
      description: '무손실 저장 · 투명도 지원',
      tags: ['JPG to PNG', 'JPEG to PNG', 'jpg to png'],
    },
    'png-to-webp': {
      name: 'PNG → WebP',
      description: '투명 유지 · 더 작은 용량',
      tags: [
        'PNG to WebP',
        'png to webp',
        'WebP 변환',
        'WebP 최적화',
        '사이트 이미지 속도',
      ],
    },
    'jpg-to-webp': {
      name: 'JPG → WebP',
      description: '같은 화질로 더 작게',
      tags: [
        'JPG to WebP',
        'JPEG to WebP',
        'jpg to webp',
        'WebP 변환',
        'WebP 최적화',
      ],
    },
    'webp-to-png': {
      name: 'WebP → PNG',
      description: 'WebP 호환성 폴백',
      tags: ['WebP to PNG', 'webp to png', 'WebP 호환', 'webp 열기'],
    },
    'webp-to-jpg': {
      name: 'WebP → JPG',
      description: '구형 플랫폼 호환',
      tags: [
        'WebP to JPG',
        'webp to jpg',
        'webp jpeg 변환',
        'WebP 구형 플랫폼',
      ],
    },
    'code-image': {
      name: '코드 이미지화',
      description: '코드로 공유 이미지 생성',
      tags: [
        '코드',
        '이미지',
        '공유',
        'snippet',
        '코드 스크린샷',
        '코드 공유 이미지',
        'Carbon 대안',
        '구문 강조 이미지',
      ],
    },
    jwt: {
      name: 'JWT 디코드',
      description: '생성, 분석, 검증',
      tags: ['JWT', 'token', '암호화', 'jsonwebtoken'],
    },
    timestamp: {
      name: '타임스탬프 변환',
      description: 'Unix 타임스탬프 ↔ 날짜',
      tags: ['타임스탬프', 'timestamp', 'Unix', '날짜', '시간'],
    },
    json: {
      name: 'JSON 포매터',
      description: 'JSON 미화, 압축, 검증',
      tags: ['JSON', '포맷', '미화', '압축', '검증', 'format', 'parser'],
    },
    base64: {
      name: 'Base64 인코딩/디코딩',
      description: '텍스트/파일과 Base64 상호 변환',
      tags: [
        'Base64',
        '인코딩',
        '디코딩',
        '파일',
        'base64 encode',
        'base64 decode',
      ],
    },
    uuid: {
      name: 'UUID 생성기',
      description: '고유 식별자 일괄 생성',
      tags: ['UUID', 'GUID', '고유 ID', '랜덤 ID', 'uuid generator'],
    },
    'url-encode': {
      name: 'URL 인코딩/디코딩',
      description: 'URL 특수 문자 인코딩 디코딩',
      tags: [
        'URL 인코딩',
        'URL 디코딩',
        'encodeURIComponent',
        '퍼센트 인코딩',
        'url encode',
      ],
    },
    color: {
      name: '색상 변환',
      description: 'HEX, RGB, HSL 색상값 상호 변환',
      tags: [
        '색상',
        '컬러',
        '색상 변환',
        'RGB',
        'HEX',
        'HSL',
        'color picker',
        '컬러 피커',
      ],
    },
    qrcode: {
      name: 'QR 코드 생성',
      description: '텍스트/링크로 QR 코드 생성',
      tags: [
        'QR 코드',
        'QR Code',
        '바코드',
        'qrcode generator',
        'QR 코드 생성기',
      ],
    },
    'any-convert': {
      name: '이미지 변환',
      description: 'PNG JPG WebP 형식 상호 변환',
      tags: [
        '이미지 변환',
        '이미지 형식 변환',
        'PNG to JPG',
        'JPG to PNG',
        'WebP',
        'BMP',
        'GIF',
        '온라인 변환',
      ],
    },
    'any-compress': {
      name: '이미지 압축',
      description: '모든 이미지 압축',
      tags: [
        '이미지 압축',
        '온라인 압축',
        '사진 압축',
        '이미지 경량화',
        '일괄 압축',
        'image compress',
      ],
    },
    watermark: {
      name: '이미지 숨김 워터마크',
      description: '숨김 텍스트 삽입/추출',
      tags: [
        '숨김 워터마크',
        '스테가노그래피',
        'watermark',
        'steganography',
        'LSB',
        'DCT',
      ],
    },
    'text-watermark': {
      name: '이미지 텍스트 워터마크',
      description: '신분증 / 제출용 / 도용 방지 워터마크',
      tags: [
        '텍스트 워터마크',
        '이미지 워터마크',
        '워터마크 추가',
        '온라인 워터마크',
        '신분증 워터마크',
        '문서 워터마크',
        '계약서 워터마크',
        '도용 방지 워터마크',
        '저작권 워터마크',
        'photo watermark',
        'text watermark',
        'image watermark',
      ],
    },
    'mp4-to-mp3': {
      name: 'MP4를 MP3로',
      description: '동영상에서 오디오 추출 · 128-320 kbps',
      tags: [
        'mp4 mp3 변환',
        '동영상 mp3',
        '오디오 추출',
        '비디오 오디오',
        'mp3 변환',
        'mp4 to mp3',
      ],
    },
    'compress-mp3': {
      name: 'MP3 압축',
      description: 'MP3 파일 크기 줄이기 · 비트레이트 낮추기',
      tags: [
        'MP3 압축',
        'MP3 용량 줄이기',
        'MP3 다이어트',
        '오디오 압축',
        'MP3 비트레이트',
      ],
    },
    'pdf-compress': {
      name: 'PDF 압축',
      description: 'PDF 파일 크기 줄이기 · 로컬 처리',
      tags: [
        'PDF 압축',
        'PDF 용량 줄이기',
        'PDF 다이어트',
        '압축 PDF',
        'pdf compress',
        'shrink pdf',
      ],
    },
    'pdf-merge': {
      name: 'PDF 병합',
      description: '여러 PDF를 하나로 합치기 · 순서 변경 가능',
      tags: [
        'PDF 병합',
        'PDF 합치기',
        'PDF 결합',
        'PDF 연결',
        'merge pdf',
        'combine pdf',
      ],
    },
    hash: {
      name: '해시 생성기',
      description: 'SHA-1 / SHA-256 / SHA-384 / SHA-512 한 번에 생성',
      tags: [
        '해시',
        'hash',
        'sha256',
        'sha-256',
        'sha512',
        '체크섬',
        '파일 무결성',
        'checksum',
      ],
    },
    password: {
      name: '비밀번호 생성기',
      description: '사용자 정의 가능한 강력한 무작위 비밀번호 생성',
      tags: [
        '비밀번호 생성기',
        '무작위 비밀번호',
        '강력한 비밀번호',
        'password generator',
        '안전한 비밀번호',
        '비밀번호 만들기',
      ],
    },
  },
  toolCategories: {
    image: {
      name: '이미지 도구',
      description: '이미지 압축, 형식 변환',
      tools: {
        compress: {
          name: '이미지 압축',
          description: '화질을 유지하며 이미지 크기 압축',
        },
        convert: {
          name: '이미지 형식 변환',
          description: 'PNG JPG WebP GIF BMP 상호 변환',
        },
        watermark: {
          name: '이미지 숨김 워터마크',
          description: '텍스트 삽입 / 추출',
        },
        'text-watermark': {
          name: '이미지 텍스트 워터마크',
          description: '제출용 / 도용 방지 워터마크',
        },
      },
    },
    code: {
      name: '개발자 도구',
      description: '개발자용 유틸리티',
      tools: {
        'code-image': {
          name: '코드 이미지화',
          description: '코드를 아름다운 공유 이미지로 변환',
        },
        json: { name: 'JSON', description: 'JSON 포맷팅' },
        jwt: { name: 'JWT', description: '생성 / 분석 / 검증' },
        timestamp: { name: '타임스탬프', description: 'Unix 타임스탬프 변환' },
        base64: { name: 'Base64', description: '텍스트/파일 인코딩/디코딩' },
        uuid: { name: 'UUID', description: '고유 식별자 일괄 생성' },
        'url-encode': {
          name: 'URL 인코딩/디코딩',
          description: 'URL 특수 문자 처리',
        },
        color: {
          name: '색상 변환',
          description: 'HEX, RGB, HSL 색상값 상호 변환',
        },
        qrcode: {
          name: 'QR 코드 생성',
          description: '텍스트/링크로 QR 코드 생성',
        },
        hash: {
          name: '해시 생성기',
          description: '텍스트와 파일의 SHA 체크섬',
        },
        password: {
          name: '비밀번호 생성기',
          description: '강력한 무작위 비밀번호 생성',
        },
      },
    },
    media: {
      name: '미디어 도구',
      description: '오디오 및 비디오 변환',
      tools: {
        'mp4-to-mp3': {
          name: 'MP4를 MP3로',
          description: '비디오 파일에서 오디오 추출',
        },
        'compress-mp3': { name: 'MP3 압축', description: 'MP3 파일 크기 감소' },
      },
    },
    document: {
      name: '문서 도구',
      description: 'PDF 처리',
      tools: {
        'pdf-compress': {
          name: 'PDF 압축',
          description: 'PDF 파일 크기 줄이기',
        },
        'pdf-merge': {
          name: 'PDF 병합',
          description: '여러 PDF를 하나의 파일로',
        },
      },
    },
  },
  notFound: {
    title: '페이지를 찾을 수 없음 - WizGo',
    h1: '404',
    body: '요청하신 페이지가 존재하지 않습니다. 링크가 잘못되었거나 페이지가 삭제되었을 수 있습니다.',
    homeBtn: '홈으로',
  },
  manifest: {
    name: 'WizGo',
    shortName: 'WizGo',
    description:
      '무료 온라인 도구 모음: 이미지 압축, 형식 변환, JWT, 타임스탬프 등. 브라우저에서 처리, 업로드 없음',
  },
  pages: {
    home: {
      title: '무료 온라인 도구: 이미지 압축, JWT, 타임스탬프 | WizGo',
      description:
        '브라우저에서 실행되는 무료 도구: 이미지 압축, 형식 변환, JWT 디코드, 타임스탬프, JSON 포맷팅, 코드 이미지화. 업로드 없음, 설치 불필요.',
      heroHeading: '무료 온라인 도구 모음',
      heroSubheading:
        '이미지 압축, 형식 변환, JWT, 타임스탬프 · 브라우저에서 처리',
      searchPlaceholder: '도구 검색 (예: PNG 압축, to JPG)...',
      emptyState: '관련 도구를 찾을 수 없음',
      features: {
        noUpload: '파일 업로드 없음',
        free: '무료 사용',
        noInstall: '설치 불필요',
      },
      schema: { alternateName: 'WizGo 도구 모음' },
    },
    compressFormat: {
      titleTemplate: '{label} 압축: 무료 온라인 {full} 도구 | WizGo',
      descriptionTemplate:
        '{label} 이미지를 브라우저에서 압축. {seoBenefit} 업로드 없음, 일괄 지원.',
      h1Template: '{label} 이미지 압축',
      formats: {
        png: {
          headline: '투명 배경 유지 · 일반적으로 60-80% 축소',
          hint: '스크린샷, 일러스트, 아이콘, 로고에 가장 적합. 육안으로 거의 차이를 알 수 없으며 투명 배경은 자동 유지.',
          seoBenefit:
            '스크린샷·아이콘 60-80%, 사진 PNG 20-30% 축소, 시각적 차이 거의 없음.',
        },
        jpg: {
          headline: '사진 전용 압축 · 일반적으로 30-45% 축소',
          hint: '사진에 깊이 최적화, 화질 거의 변화 없음. 사진의 촬영 위치, 기기 등 개인 정보도 자동 제거.',
          seoBenefit:
            '사진 30-45% 축소, 촬영 위치·기기 모델 등 개인 정보 자동 제거.',
        },
        webp: {
          headline: '무손실 압축 · 투명 배경 유지',
          hint: 'WebP 이미지를 무손실 최적화, 화질과 투명도 완전 유지. 이미 충분히 작으면 도구가 원본을 반환합니다.',
          seoBenefit:
            '무손실 압축으로 투명도 유지, 최적화된 원본은 그대로 반환.',
        },
      },
      upload: {
        dragTemplate: '{label} 이미지를 여기에 드롭',
        orClick: '또는 클릭하여 업로드 (다른 형식도 가능)',
        pasteHint: '또는 ⌘V / Ctrl+V로 붙여넣기',
        sizeHint: '최대 100MB · 일괄 지원',
      },
      options: {
        strength: '압축 강도:',
        smart: '스마트',
        light: '약',
        strong: '강',
        start: '압축 시작',
      },
      aboutTemplate: '{label} 압축에 대하여',
      related: {
        label: '다른 형식 압축',
        compressTemplate: '{label} 압축',
        toJpgTemplate: '{label} → JPG',
        toWebpTemplate: '{label} → WebP',
        all: '전체 이미지 압축',
      },
      schema: {
        browserReq: 'WebAssembly 지원 최신 브라우저',
        descriptionTemplate: '{full} 이미지 온라인 압축, {headline}.',
      },
    },
    convertPair: {
      titleTemplate:
        '{fromLabel} → {toLabel}: 무료 온라인 이미지 포맷 변환 도구 | WizGo',
      descriptionTemplate:
        '무료 온라인 {fromLabel} → {toLabel} 브라우저에서 변환. {hintWithSpace}업로드 없음, 설치 불필요.',
      h1Template: '{fromLabel} → {toLabel}',
      fallbackHintTemplate:
        '{fromFull} 이미지를 온라인에서 {toFull} 형식으로 변환 · 브라우저에서 처리',
      pairHints: {
        'png-jpg':
          '투명 배경은 흰색으로 채워지며 40-80% 축소, 웹·메일 공유에 적합.',
        'png-webp': '투명도 유지하며 PNG보다 25-50% 작고, 최신 브라우저 지원.',
        'png-gif': 'GIF만 지원하는 구형 플랫폼용.',
        'png-bmp': '무손실 비압축 BMP, 구형 Windows 프로그램 호환용.',
        'jpg-png': '무손실 저장과 투명도, 로고 배경 처리 전 단계에 적합.',
        'jpg-webp':
          '25-35% 추가 축소, 시각적 차이 거의 없음, 이미지 많은 사이트에.',
        'jpg-gif': '사진을 구형 채팅 플랫폼 형식으로.',
        'jpg-bmp': '무손실이지만 큰 비트맵, 인쇄나 특수 프로그램 입력용.',
        'webp-png': 'WebP 미지원 시 가장 안전한 폴백, 투명도 완전 유지.',
        'webp-jpg': 'WebP 미지원 구형 플랫폼에 가장 확실.',
        'webp-gif': '구형 브라우저나 GIF만 지원하는 채팅용.',
        'webp-bmp': '특정 그래픽 프로그램이나 인쇄 흐름용.',
        'gif-png': '투명도 유지, 더 선명 (첫 프레임만).',
        'gif-jpg': '더 작지만 투명도·다른 프레임 손실, 공유용.',
        'gif-webp': '정적 이미지 추가 압축 가능, 투명도 유지.',
        'gif-bmp': '첫 프레임만, 그래픽 일괄 처리용.',
        'bmp-png': '무손실 대폭 축소 (보통 70%+), 보관에 적합.',
        'bmp-jpg': '압축률 최고, 대량 스캔·스크린샷 공유에 적합.',
        'bmp-webp': '최고 압축률, 최신 브라우저 지원.',
        'bmp-gif': 'GIF만 지원하는 구형 채팅·포럼용.',
      },
      upload: {
        dragTemplate: '{fromLabel} 이미지를 여기에 드롭',
        orClick: '또는 클릭하여 업로드 (다른 이미지 형식도 가능)',
        pasteHint: '또는 ⌘V / Ctrl+V로 붙여넣기',
        sizeHint: '최대 100MB · 일괄 지원',
      },
      options: {
        quality: '화질:',
        qualityLossless: '무손실',
        qualityHigh: '높음',
        qualityMid: '중간',
        qualityLow: '낮음',
        startTemplate: '{toLabel}로 변환',
      },
      related: {
        label: '관련 형식 변환',
        pairTemplate: '{fromLabel} → {toLabel}',
        more: '더 많은 형식',
      },
      schema: {
        descriptionTemplate:
          '{fromFull} 이미지를 온라인에서 {toFull} 형식으로 변환, 브라우저에서 처리.',
      },
    },
    compress: {
      title: '이미지 압축 - PNG, JPG, WebP 온라인 무손실 압축 | WizGo',
      description:
        '무료 온라인 이미지 압축 도구. PNG, JPG, JPEG, WebP, GIF 등 일반 형식 지원, 화질을 유지하며 파일 크기를 대폭 축소. 모두 브라우저에서 처리, 일괄 압축 지원.',
      h1: '이미지 압축',
      subheading:
        'PNG, JPG, WebP 온라인 무손실 압축 · 브라우저에서 처리 · 일괄 지원',
      schema: {
        name: '이미지 압축',
        description:
          '무료 온라인 이미지 압축 도구, PNG, JPG, WebP 형식 지원, 브라우저에서 처리',
        browserReq: 'WebAssembly 지원 최신 브라우저',
      },
      upload: {
        drag: '이미지를 여기에 드롭',
        orClick: '또는 클릭하여 업로드',
        pasteHint: '또는 ⌘V / Ctrl+V로 붙여넣기',
        sizeHint: 'JPG, PNG, WebP, GIF 지원 · 최대 100MB',
      },
      options: {
        strength: '압축 강도:',
        smart: '스마트',
        light: '약',
        strong: '강',
        start: '압축 시작',
      },
    },
    convert: {
      title: '이미지 형식 변환: PNG/JPG/WebP 온라인 | WizGo',
      description:
        '무료 온라인 이미지 형식 변환 도구. PNG, JPG, JPEG, WebP, GIF, BMP 등 일반 형식 상호 변환 지원. 모두 브라우저에서 처리, 안전, 빠르고 설치 불필요.',
      h1: '이미지 형식 변환',
      subheading:
        'PNG, JPG, WebP, GIF, BMP 온라인 상호 변환 · 브라우저에서 처리',
      schema: {
        name: '이미지 형식 변환',
        description:
          'PNG, JPG, WebP, GIF, BMP 온라인 상호 변환, 브라우저에서 처리',
      },
      upload: {
        drag: '이미지를 여기에 드롭',
        orClick: '또는 클릭하여 업로드',
        pasteHint: '또는 ⌘V / Ctrl+V로 붙여넣기',
        sizeHint: '최대 100MB',
      },
      options: {
        fromLabel: '원본 형식:',
        autoDetect: '자동 감지',
        toLabel: '변환 대상:',
        qualityLabel: '화질:',
        qualityLossless: '무손실',
        qualityHigh: '높음',
        qualityMid: '중간',
        qualityLow: '낮음',
        start: '변환 시작',
      },
    },
    about: {
      title: 'WizGo 소개: 로컬 처리 도구 | WizGo',
      description:
        'WizGo의 기술과 개인 정보 정책. 모든 도구는 브라우저에서 로컬 실행, 파일 업로드 없음. Astro + Rust WASM + WebCrypto 기반.',
      h1: 'WizGo 소개',
      schema: {
        name: 'WizGo 소개',
        description:
          'WizGo의 기술 스택과 개인 정보 정책: 모든 도구는 브라우저에서 로컬 실행, 파일 업로드 없음.',
        orgDescription:
          '무료 온라인 도구 모음, 이미지 압축, 형식 변환, JWT, 타임스탬프 등, 모두 브라우저에서 처리.',
      },
      intro:
        'WizGo는 무료, 안전, 빠른 온라인 도구 모음입니다. 사용자의 데이터 개인 정보가 매우 중요하다고 믿기에 모든 도구는 브라우저에서 로컬로 처리되며 파일과 데이터는 어떤 서버에도 업로드되지 않습니다.',
      techStack: {
        heading: '기술 스택',
        image: {
          title: '이미지 처리',
          body: 'Rust로 작성된 WebAssembly 모듈. imagequant 팔레트 양자화와 jpeg-encoder 최적화 파이프라인 통합, PNG, JPEG, WebP, GIF, BMP 등 형식 지원',
        },
        crypto: {
          title: '암호화와 서명',
          body: 'JWT 디코드, 발행, 검증 모두 브라우저 네이티브 WebCrypto 사용, HS, RS, ES 계열 알고리즘 지원, 외부 의존성 없음',
        },
        frontend: {
          title: '프론트엔드 프레임워크',
          body: 'Astro 기반 정적 빌드, Tailwind CSS로 Vercel 스타일의 깔끔한 UI 구현',
        },
        pwa: {
          title: 'PWA 지원',
          body: '프로그레시브 웹 앱 지원, 데스크톱과 모바일에 설치 가능, 오프라인에서도 사용 가능',
        },
      },
      privacy: {
        heading: '개인 정보 정책',
        intro:
          'WizGo는 순수 프론트엔드 아키텍처를 채택, 모든 파일 처리는 브라우저에서 완료됩니다:',
        items: [
          '파일은 어떤 서버에도 업로드되지 않습니다',
          '개인 데이터를 수집하지 않습니다',
          '소량의 환경 설정만 로컬 LocalStorage에 저장됩니다',
        ],
      },
      limits: {
        heading: '제한 사항',
        intro:
          '브라우저 환경의 제약으로 인해 WizGo에는 다음과 같은 사용 제약이 있습니다:',
        items: [
          '이미지 파일은 100MB 이내 권장',
          '큰 파일 처리에는 시간이 걸릴 수 있음',
          '일부 고급 압축 알고리즘 (mozjpeg trellis, libwebp 손실 등)은 순수 Rust WASM 툴체인 제약을 받음',
        ],
      },
      credits: {
        heading: '오픈소스 라이브러리 감사',
        intro:
          'WizGo 빌드 과정에서 다음의 우수한 오픈소스 라이브러리를 사용했습니다:',
        items: [
          {
            label: 'imagequant',
            href: 'https://github.com/ImageOptim/libimagequant',
            desc: 'PNG 팔레트 양자화',
          },
          {
            label: 'lodepng-rust',
            href: 'https://github.com/kornelski/lodepng-rust',
            desc: '순수 Rust PNG 인코딩',
          },
          {
            label: 'jpeg-encoder',
            href: 'https://github.com/vstroebel/jpeg-encoder',
            desc: 'Rust JPEG 인코더',
          },
          {
            label: 'Astro',
            href: 'https://astro.build',
            desc: '최신 정적 사이트 생성기',
          },
          {
            label: 'Geist',
            href: 'https://vercel.com/font',
            desc: 'Vercel 디자인 폰트',
          },
        ],
      },
    },
    watermark: {
      title:
        '이미지 숨김 워터마크: LSB·DCT 스테가노그래피 삽입·추출 도구 | WizGo',
      description:
        'LSB와 DCT 스테가노그래피 알고리즘을 이용해 이미지 픽셀에 숨김 텍스트를 삽입하거나 추출하는 무료 온라인 도구입니다. 보이지 않는 디지털 워터마크로 이미지 출처 추적과 저작권 보호에 활용할 수 있으며, 모든 처리는 브라우저에서 로컬로 완료되어 데이터 유출 걱정이 없습니다.',
      h1: '이미지 숨김 워터마크',
      subheading:
        '텍스트를 이미지 픽셀에 숨기거나 이미지에서 추출 · 브라우저에서 처리',
      schema: {
        name: '이미지 숨김 워터마크',
        description:
          '이미지 픽셀에 숨김 텍스트를 삽입하거나 이미지에서 워터마크 추출, LSB와 DCT 두 알고리즘 지원, 모두 브라우저에서 처리',
      },
      tabs: { embed: '삽입', extract: '추출' },
      common: {
        imageLabel: '이미지',
        dropImage: '클릭 또는 이미지를 여기에 드롭',
        formats: 'PNG · JPG · WebP',
        replaceImage: '이미지 변경',
        copyBtn: '복사',
      },
      embed: {
        textLabel: '숨김 텍스트',
        textPlaceholder: '예: © 작성자 2026',
        runBtn: '워터마크 삽입',
        jpgWarn: '출력은 항상 PNG. PNG로 저장하면 최대 호환성 유지',
        resultLabel: '워터마크가 포함된 결과',
        downloadBtn: 'PNG 다운로드',
        copyImageBtn: '이미지 복사',
      },
      extract: {
        resultLabel: '추출 결과',
        resultPlaceholder: '아래 버튼을 클릭하여 워터마크 추출',
        runBtn: '워터마크 추출',
      },
      faq: {
        heading: '도구 안내',
        paragraphs: [
          '텍스트를 이미지에 "숨김": 변경 사항은 육안으로 보이지 않으며 이미지 크기도 변하지 않지만 본 도구로 이 텍스트를 다시 읽을 수 있습니다. 이미지에 보이지 않는 서명을 넣거나 출처 추적, 추가 설명에 사용할 수 있습니다.',
          '삽입 결과는 항상 PNG로 저장되어 모든 워터마크 신호를 유지합니다. 이미지가 나중에 JPG로 저장되어 재압축되면 짧은 텍스트는 보통 추출 가능, 긴 텍스트나 여러 번 압축 시 실패할 수 있으니 안전을 위해 PNG 원본을 보관하세요.',
          '모든 처리는 브라우저에서 로컬로 완료, 이미지와 텍스트는 업로드되지 않습니다.',
        ],
      },
    },
    uuid: {
      title: 'UUID 생성기 - 온라인 일괄 고유 식별자 생성 | WizGo',
      description:
        '무료 온라인 UUID 생성기. 일괄 생성, 다양한 형식 (표준/하이픈 없음/대문자), 원클릭 복사 지원. 암호학적으로 안전한 난수 사용, 브라우저에서 처리.',
      h1: 'UUID 생성기',
      subheading:
        '고유 식별자 일괄 생성 · 표준 / 하이픈 없음 / 대문자 · 브라우저에서 생성',
      schema: {
        name: 'UUID 생성기',
        description: '온라인에서 UUID 고유 식별자 일괄 생성, 다양한 형식 지원',
      },
      countLabel: '생성 수',
      formatLabel: '형식 옵션',
      noDashes: '하이픈 (-) 제거',
      uppercase: '대문자',
      generateBtn: '재생성',
      resultLabel: '생성 결과',
      copyAllBtn: '모두 복사',
      copiedAllBtn: '모두 복사됨',
      empty: '"재생성" 버튼을 클릭하여 UUID 생성',
      copyBtn: '복사',
      copiedBtn: '복사됨',
      info: {
        heading: 'UUID 소개',
        body: 'UUID(범용 고유 식별자)는 128비트 식별자로, 일반적으로 32자리 16진수를 5개 그룹으로 나누어 표시합니다. 본 도구는 브라우저 내장 암호학적 안전 난수 생성기 (crypto.getRandomValues)를 사용하여 UUID v4 버전을 생성하므로 매우 높은 고유성을 보장합니다. 데이터베이스 기본 키, 세션 식별자, API 키 등에 적합.',
      },
    },
    urlEncode: {
      title: 'URL 인코딩/디코딩 - 온라인 URL 인코더/디코더 | WizGo',
      description:
        '무료 온라인 URL 인코딩/디코딩 도구. 한글과 특수 문자 인코딩, 일괄 처리, encodeURI 와 encodeURIComponent 모드 전환 지원. 브라우저에서 처리.',
      h1: 'URL 인코딩/디코딩',
      subheading:
        'URL 특수 문자 인코딩 디코딩 · 한글 지원 · 일괄 처리 · 브라우저에서 처리',
      schema: {
        name: 'URL 인코딩/디코딩',
        description: 'URL 인코딩 디코딩 도구, 한글과 특수 문자 지원',
      },
      tabEncode: '인코딩',
      tabDecode: '디코딩',
      encodeMode: {
        label: '인코딩 모드',
        component: '전체 인코딩 (권장)',
        uri: 'URL 문자 보존',
        componentHint:
          '전체 인코딩: 모든 특수 문자를 인코딩, URL 매개변수 값에 적합',
        uriHint:
          'URL 문자 보존: : / ? # & = 등 URL 예약 문자 인코딩 안 함, 전체 URL 인코딩에 적합',
      },
      labels: {
        inputEncode: '텍스트 입력',
        inputDecode: '인코딩 입력',
        outputEncode: '인코딩 결과',
        outputDecode: '디코딩 결과',
      },
      placeholders: {
        inputEncode: '인코딩할 텍스트를 입력...',
        inputDecode: '디코딩할 URL 인코딩 문자열을 붙여넣기...',
        output: '결과가 여기에 표시됩니다...',
      },
      hint: '여러 줄 일괄 처리 지원',
      copyBtn: '복사',
      copiedBtn: '복사됨',
      clearBtn: '지우기',
      charCountTemplate: '문자 수: {count}',
      errors: {
        encode: '인코딩 실패: 인코딩할 수 없는 문자가 포함됨',
        decode: '디코딩 실패: 잘못된 URL 인코딩 문자열',
      },
      examples: {
        heading: '인코딩 예시',
        labels: { chinese: '한글', space: '공백', ampersand: '&', equals: '=' },
      },
      useCases: {
        heading: '사용 시나리오',
        items: [
          'URL에서 한글 문자 전달',
          '매개변수가 있는 URL 링크 구성',
          '폼 데이터의 특수 문자 처리',
          'API 요청 매개변수 인코딩',
          '인코딩된 URL 문자열 분석',
        ],
      },
    },
    qrcode: {
      title: 'QR 코드 생성 - 온라인 텍스트/링크에서 QR 코드 도구 | WizGo',
      description:
        '무료 온라인 QR 코드 생성기. 텍스트, URL, 연락처에서 QR 코드 생성. 크기, 색상 사용자 정의, PNG/SVG 다운로드 지원. 모두 브라우저에서 생성.',
      h1: 'QR 코드 생성',
      subheading:
        '텍스트/링크로 QR 코드 · 스타일 사용자 정의 · PNG/SVG 다운로드 · 브라우저에서 생성',
      schema: {
        name: 'QR 코드 생성기',
        description: '온라인 QR 코드 생성, 사용자 정의 크기와 색상 지원',
      },
      content: {
        label: '내용',
        placeholder: '텍스트 또는 URL 입력...',
        hint: '지원: 텍스트, URL, 이메일, 전화번호 등',
      },
      size: '크기',
      colors: { label: '색상', foreground: '전경색', background: '배경색' },
      ec: {
        label: '오류 수정 수준',
        low: '낮음',
        medium: '중간',
        quartile: '높음',
        high: '최고',
        lowTitle: '낮음 - 약 7% 오류 수정',
        mediumTitle: '중간 - 약 15% 오류 수정',
        quartileTitle: '높음 - 약 25% 오류 수정',
        highTitle: '최고 - 약 30% 오류 수정',
        hint: '오류 수정 수준이 높을수록 QR 코드가 가려지거나 손상되어도 인식 가능',
      },
      generateBtn: 'QR 코드 생성',
      resetBtn: '재설정',
      preview: '미리보기',
      previewEmpty: '내용을 입력하고 "QR 코드 생성" 클릭',
      generating: '생성 중...',
      generateError: '생성 실패, 내용을 확인하세요',
      emptyContent: '내용을 입력하세요',
      downloadPng: 'PNG 다운로드',
      downloadSvg: 'SVG 다운로드',
      infoTemplate:
        '내용 길이: {chars} 문자 / {bytes} 바이트 · 크기: {size}x{size}px',
      examples: {
        heading: '사용 예시',
        url: 'URL:',
        email: '이메일:',
        phone: '전화:',
        wifi: 'WiFi:',
      },
    },
    timestamp: {
      title:
        'Unix 타임스탬프 변환 도구 - 초·밀리초 자동 감지·날짜 ↔ 타임스탬프 | WizGo',
      description:
        '무료 온라인 Unix 타임스탬프 변환 도구입니다. 초와 밀리초를 자동으로 감지하여 UTC 및 로컬 시간대로 변환하고, ISO 8601 형식과 상대 시간도 함께 제공합니다. 실시간 현재 타임스탬프 표시와 원클릭 복사 기능으로 API 개발 및 데이터 분석 시 편리하게 사용할 수 있습니다.',
      h1: '타임스탬프 변환',
      subheading: 'Unix 타임스탬프 ↔ 날짜 · 초 / 밀리초 / ISO 8601 지원',
      schema: {
        name: 'Unix 타임스탬프 변환',
        description:
          'Unix 타임스탬프 ↔ 날짜 변환 도구, 초/밀리초, UTC/로컬 시간대 지원',
      },
      currentTime: {
        label: '현재 시간',
        pauseBtn: '일시 정지',
        resumeBtn: '재개',
        unixSec: 'Unix 초',
        unixMs: 'Unix 밀리초',
        localTime: '로컬 시간',
        isoUtc: 'ISO 8601 (UTC)',
        tzTemplate: '시간대: {tz} · UTC{sign}{h}:{m}',
        tzPlaceholder: '시간대: —',
      },
      t2d: {
        label: '타임스탬프 → 날짜',
        fillNowBtn: '현재 입력',
        units: { auto: '자동', sec: '초', ms: '밀리초' },
        placeholder: '예: 1516239022 또는 1516239022000',
        errors: {
          nan: '숫자여야 합니다',
          oor: '숫자가 범위를 벗어남',
          invalid: '잘못된 타임스탬프',
        },
        outputs: {
          local: '로컬 시간',
          utc: 'UTC 시간',
          iso: 'ISO 8601',
          relative: '상대 시간',
        },
      },
      d2t: {
        label: '날짜 → 타임스탬프',
        fillNowBtn: '현재 입력',
        isoPlaceholder: '또는 ISO 문자열 붙여넣기: 2024-01-18T03:30:22Z',
        errors: {
          invalidDate: '잘못된 날짜',
          unparseable: '날짜 문자열을 분석할 수 없음',
        },
        outputs: { sec: 'Unix 초', ms: 'Unix 밀리초', iso: 'ISO 8601 (UTC)' },
      },
      copyBtn: '복사',
      copiedBtn: '복사됨',
      justNow: '방금',
      footerHint:
        'Unix 에포크: 1970-01-01 00:00:00 UTC · 초 타임스탬프 10자리 · 밀리초 13자리',
    },
    color: {
      title: '색상 변환 - 온라인 HEX/RGB/HSL 색상값 변환 도구 | WizGo',
      description:
        '무료 온라인 색상 변환 도구. 16진 색상값, RGB 값, HSL 색상 상호 변환 지원. 실시간 미리보기, 원클릭 복사, 디자이너와 개발자에게 적합. 브라우저에서 처리.',
      h1: '색상 변환',
      subheading:
        '16진, RGB, HSL 색상값 상호 변환 · 실시간 미리보기 · 브라우저에서 처리',
      schema: {
        name: '색상 변환',
        description: 'HEX, RGB, HSL 색상값 상호 변환 도구, 실시간 미리보기',
      },
      pickerHint: '클릭하여 색상 선택',
      hex: { label: '16진 색상값' },
      rgb: { label: 'RGB 값', r: 'R (빨강)', g: 'G (초록)', b: 'B (파랑)' },
      hsl: { label: 'HSL 색상', h: 'H (색조)', s: 'S (채도)', l: 'L (명도)' },
      copyBtn: '복사',
      copiedBtn: '복사됨',
      quickColorsLabel: '자주 사용하는 색상',
      colorNames: {
        black: '검정',
        red: '빨강',
        orange: '주황',
        amber: '호박색',
        yellowGreen: '연두',
        green: '초록',
        cyan: '청록',
        blue: '파랑',
        indigo: '남색',
        purple: '보라',
        pink: '분홍',
        white: '하양',
      },
      randomBtn: '랜덤 색상',
    },
    codeImage: {
      title:
        '코드 이미지화: 무료 Carbon 대안·구문 강조 코드 공유 이미지 생성기 | WizGo',
      description:
        '코드 스니펫을 구문 강조된 아름다운 공유 이미지로 변환하는 무료 온라인 도구입니다. JavaScript, TypeScript, Python, Go, Rust 등 다양한 프로그래밍 언어를 지원하며 여러 테마 중 선택할 수 있습니다. Carbon 대안으로 원클릭 PNG 다운로드와 클립보드 복사가 가능합니다.',
      h1: '코드 이미지화',
      subheading: '코드 스니펫을 아름다운 공유 이미지로 · 다국어 · 다양한 테마',
      schema: {
        name: '코드 이미지화',
        description:
          '코드를 아름다운 공유 이미지로 변환, 다국어와 다양한 테마 지원',
      },
      placeholder: '여기에 코드를 입력 또는 붙여넣기...',
      formatBtn: '포맷',
      sampleBtn: '샘플 불러오기',
      copyBtn: '이미지 복사',
      downloadBtn: '이미지 다운로드',
      tipPrefix: '팁:',
      tipBody:
        '다양한 프로그래밍 언어 하이라이트 지원, 코드는 실시간으로 렌더링되며 입력만으로 효과를 확인할 수 있습니다.',
      renderError: '렌더링 실패',
    },
    base64: {
      title: 'Base64 인코딩/디코딩: 텍스트·파일 | WizGo',
      description:
        '무료 Base64 인코딩/디코딩. 텍스트와 Base64 상호 변환, 이미지 미리보기, 바이너리 다운로드 지원. 브라우저에서 처리.',
      h1: 'Base64 인코딩/디코딩',
      subheading:
        '텍스트/파일과 Base64 상호 변환 · 이미지, 텍스트, 바이너리 지원 · 브라우저에서 처리',
      schema: {
        name: 'Base64 인코딩/디코딩',
        description:
          '텍스트/파일과 Base64 상호 변환 도구, 이미지, 텍스트, 바이너리 지원',
      },
      tabs: { encode: '인코딩', decode: '디코딩' },
      labels: {
        inputEncode: '텍스트 입력',
        inputDecode: 'Base64 입력',
        outputEncode: 'Base64 결과',
        outputDecode: '디코딩 결과',
        imagePreview: '이미지 미리보기',
        imageAlt: '미리보기',
      },
      placeholders: {
        inputEncode: '텍스트 입력...',
        inputDecode: 'Base64 문자열 붙여넣기...',
        outputEncode: 'Base64 결과가 여기에 표시됩니다...',
        outputDecode: '디코딩 결과가 여기에 표시됩니다...',
      },
      clearBtn: '지우기',
      uploadBtn: '파일 업로드',
      copyBtn: '복사',
      copiedBtn: '복사됨',
      downloadBtn: '파일 다운로드',
      fileSizeLimit: '파일 크기 제한: 5MB',
      unknownType: '알 수 없는 유형',
      errors: {
        encodeFail: '인코딩 실패: 처리할 수 없는 문자가 포함됨',
        fileReadFail: '파일 읽기 실패',
        decodeFail: '디코딩 실패: 잘못된 Base64 문자열',
        fileTooLargeTemplate: '파일이 너무 큼, 최대 5MB, 현재 {size}',
      },
      binaryFileTemplate: '[바이너리 파일 - {size}]',
      tips: {
        heading: '사용 안내',
        items: [
          '인코딩: 텍스트를 입력하거나 파일을 업로드하면 자동으로 Base64 문자열로 변환',
          '디코딩: Base64 문자열 붙여넣기 (data URI 접두사 포함 가능), 자동으로 텍스트나 파일로 복원',
          '이미지 미리보기 지원: 디코딩된 이미지를 페이지에서 직접 확인',
          '파일 다운로드: 디코딩된 바이너리 파일을 직접 다운로드 저장',
        ],
      },
    },
    jwt: {
      title: 'JWT 온라인 디코딩/생성/검증 도구 - HS256 RS256 ES256 | WizGo',
      description:
        '온라인 JSON Web Token 도구. header/payload 디코딩, 서명 검증, 새 token 생성. HS256/384/512, RS256/384/512, ES256/384 알고리즘 지원, 브라우저에서 처리.',
      h1: 'JWT 디코딩/생성/검증',
      subheading:
        'JSON Web Token 온라인 도구 · HS256 RS256 ES256 · 브라우저에서 처리',
      schema: {
        name: 'JWT 디코딩/생성/검증',
        description:
          'JSON Web Token 온라인 도구, HS/RS/ES 계열 알고리즘 지원, 브라우저에서 처리',
      },
      algoLabel: '서명 알고리즘',
      encodedLabel: 'Encoded · 전체 Token',
      encodedPlaceholder: 'header.payload.signature',
      sampleBtn: '샘플 불러오기',
      copyBtn: '복사',
      copiedBtn: '복사됨',
      verify: {
        idle: '서명 검증을 위해 token과 키를 입력하세요',
        ok: '서명 검증 통과',
        bad: '서명 불일치',
        needSecret: '서명 검증을 위해 secret 입력',
        needPubkey: '서명 검증을 위해 public key 붙여넣기',
        needSecretForSign: '서명 생성을 위해 secret 입력',
        needPrivkeyForSign: '서명 생성을 위해 private key 붙여넣기',
        signedNoVerify: '서명됨 · 검증을 위해 public key/secret 붙여넣기',
        failTemplate: '검증 실패: {msg}',
      },
      headerLabel: 'Header',
      payloadLabel: 'Payload',
      secret: {
        label: 'Secret (UTF-8 또는 base64)',
        isB64Label: 'secret은 base64 인코딩',
        placeholder: 'your-256-bit-secret',
      },
      pubkeyLabel: 'Public Key (PEM, 검증용)',
      privkeyLabel: 'Private Key (PEM, 서명용)',
      pubkeyPlaceholder:
        '-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----',
      privkeyPlaceholder:
        '-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----',
      errors: {
        pemEmpty: 'PEM 내용이 비어 있음',
        jwtFormat: 'JWT 형식 오류: header.payload.signature 이어야 함',
        headerB64: 'Header base64 잘못됨',
        payloadB64: 'Payload base64 잘못됨',
        headerJson: 'Header가 유효한 JSON이 아님',
        payloadJson: 'Payload가 유효한 JSON이 아님',
        signFailTemplate: '서명 실패: {msg}',
      },
    },
    textWatermark: {
      title: '주민등록증·운전면허증 워터마크: 도용 방지 도구 | WizGo',
      description:
        '주민등록증, 운전면허증, 계약서 스캔본에 "○○용도만 사용" 텍스트 워터마크 추가. 은행·부동산·KYC 제출 전 도용 방지. 타일/중앙/우하단 배치. 브라우저에서 처리.',
      h1: '이미지 텍스트 워터마크',
      subheading:
        '주민등록증·운전면허증·계약서 사본에 "○○ 제출 전용" 워터마크 추가 · 도용 방지 · 브라우저에서 처리',
      schema: {
        name: '이미지 텍스트 워터마크',
        alternateNames: [
          '주민등록증 워터마크',
          '운전면허증 워터마크',
          '신분증 사본 워터마크',
          '이미지 텍스트 워터마크',
        ],
        description:
          '주민등록증·운전면허증·주민등록등본·계약서 등의 스캔 이미지에 "○○ 전용" 보이는 텍스트 워터마크를 추가하여 수신자가 용도 외로 재사용할 수 없도록 합니다. 타일, 중앙, 우하단 3가지 배치 지원, 모두 브라우저에서 처리.',
        featureList: [
          '주민등록증 / 운전면허증 신분증 사본 워터마크',
          '"○○ 제출 전용" 등 용도 한정 워터마크',
          '타일 / 중앙 / 우하단 배치',
          '색상, 크기, 투명도, 회전 각도 조정 가능',
          '브라우저에서 처리, 이미지 업로드 없음',
          'PNG / JPG / WebP 지원',
        ],
      },
      howToSchema: {
        name: '신분증·계약서 이미지에 텍스트 워터마크를 추가하는 방법',
        description:
          '3단계로 "○○ 전용" 텍스트 워터마크를 추가하여 신분증 사본과 계약서의 유출·도용 방지',
        toolName: '브라우저 (Chrome / Safari / Edge)',
        steps: [
          {
            name: '이미지 업로드',
            text: '업로드 영역을 클릭하거나 이미지를 직접 드래그하세요. PNG / JPG / WebP 지원, 이미지는 로컬에서 처리되며 서버에 업로드되지 않습니다.',
          },
          {
            name: '워터마크 텍스트 입력',
            text: '예: "○○은행 2026년 주택담보대출 신청 전용", "○○부동산 전월세 심사 전용", "○○증권 계좌 개설 전용". 구체적인 용도와 수신자 이름을 명시하세요.',
          },
          {
            name: '스타일 조정 및 다운로드',
            text: '타일 (자르기 방지)을 선택, 색상, 크기, 투명도, 회전 각도 조정, PNG 다운로드 클릭.',
          },
        ],
      },
      faqSchema: {
        items: [
          {
            question:
              '내 주민등록증·운전면허증에 워터마크를 추가하는 것이 합법인가요?',
            answer:
              '합법입니다. 본인이 소유한 사본 / 스캔본에 "○○ 전용" 텍스트 워터마크를 추가하는 것은 신분증이 다른 용도로 유용되는 것을 방지하는 권장 수단이며, 증명서 자체의 효력에는 영향을 주지 않습니다.',
          },
          {
            question: '워터마크 텍스트에는 무엇을 써야 하나요?',
            answer:
              '"용도 + 수신자 + 날짜" 3요소를 포함하는 것을 권장. 예: "○○은행 2026년 주택담보대출 신청 전용". 구체적일수록 오용되기 어렵습니다.',
          },
          {
            question: '워터마크를 어디에 두는 것이 가장 안전한가요?',
            answer:
              '타일 모드가 가장 안전합니다 — 텍스트를 이미지 전체에 대각선으로 깔아 자르기로 제거할 수 없습니다. 우하단 등 모서리 워터마크는 직접 잘리기 쉽습니다. 신분증 등 중요 문서는 타일 + 반투명 회색 권장.',
          },
          {
            question: '이미지가 서버에 업로드되나요?',
            answer:
              '아니요. 본 도구의 모든 처리는 브라우저에서 로컬로 완료됩니다 (Canvas 2D). 이미지 파일과 워터마크 텍스트는 사용자 기기를 떠나지 않으며, 서버는 정적 페이지만 제공합니다.',
          },
          {
            question: '워터마크를 PS로 제거할 수 있나요?',
            answer:
              '텍스트 워터마크는 본질적으로 보이는 픽셀 변경이므로 숙련자는 PS로 지울 수 있지만 시간이 걸리고 흔적이 남습니다. 일반적인 도용 시나리오에서는 텍스트 워터마크의 억지력으로 충분합니다. 제거 저항성 "보이지 않는 서명"이 필요하다면 이미지 숨김 워터마크 도구를 사용하세요.',
          },
          {
            question:
              '워터마크가 추가된 이미지는 JPG와 PNG 중 어떤 것으로 저장하나요?',
            answer:
              '본 도구는 PNG로 내보냅니다 (무손실, 워터마크 가장자리가 가장 선명). 파일이 너무 크면 "PNG 압축" 도구로 더 줄일 수 있습니다.',
          },
        ],
      },
      imageLabel: '이미지',
      dropImage: '클릭 또는 이미지를 여기에 드롭',
      formats: 'PNG · JPG · WebP',
      replaceImage: '이미지 변경',
      textLabel: '워터마크 텍스트',
      textDefault: '○○은행 주택담보대출 신청 전용',
      textPlaceholder: '예: ○○은행 주택담보대출 신청 전용',
      sizeLabel: '크기',
      colorLabel: '색상',
      boldLabel: '굵게',
      swatches: {
        red: '빨강',
        white: '하양',
        lightGray: '연한 회색',
        midGray: '중간 회색',
        darkGray: '진한 회색',
        charcoal: '숯회색',
        black: '검정',
      },
      customColorTitle: '사용자 정의 색상',
      opacityLabel: '투명도',
      rotationLabel: '회전 각도',
      spacingLabel: '간격',
      patternLabel: '배치 방식',
      patterns: { tile: '타일', single: '단일', corner: '우하단' },
      downloadBtn: 'PNG 다운로드',
      copyImageBtn: '이미지 복사',
      useCases: {
        heading: '일반적인 용도',
        items: [
          {
            title: '주민등록증·운전면허증 · 부정 사용 방지',
            bodyHtml:
              '은행 대출, 전월세 심사, 이직 시 신원 확인 과정에서 주민등록증 또는 운전면허증 사본 제출이 빈번합니다. "○○은행 2026년 주택담보대출 신청 전용" 같은 워터마크를 추가하면 신분증 사본이 대출 사기나 무단 계좌 개설 등 다른 용도로 유용되는 것을 방지할 수 있습니다. <strong>타일 모드</strong>, 투명도 30–50% 권장.',
          },
          {
            title: '계약서 · 근로계약서 · 비밀유지계약',
            bodyHtml:
              '협력사, 고객사에 계약서·근로계약서·NDA 스캔본을 이메일로 전송할 때 "○○사 계약 검토 전용" 워터마크를 추가하면 이후 재배포를 견제할 수 있습니다. 원천징수영수증이나 급여명세서를 세무 대리인에게 공유할 때도 동일.',
          },
          {
            title: '주민등록등본 · 가족관계증명서 · 등기부등본',
            bodyHtml:
              '주민등록등본, 가족관계증명서, 등기부등본 등을 부동산 중개사나 금융기관에 제출할 때 "○○부동산 전월세 심사 전용" 워터마크를 넣으면 다른 용도로 유용될 위험을 줄일 수 있습니다.',
          },
          {
            title: '도용 방지 / 저작권 보호',
            bodyHtml:
              '사진, 제품 이미지, 일러스트를 SNS 게시 전 작가 서명이나 도메인을 추가하면 직접 도용 확률을 크게 낮출 수 있습니다. 저작권 마크는 <strong>우하단</strong>에 차분하게, 도용 방지는 <strong>타일</strong>로 강하게 덮습니다.',
          },
        ],
      },
      steps: {
        heading: '사용 단계',
        itemsHtml: [
          '<strong>이미지 업로드</strong> —— 업로드 영역을 클릭하거나 이미지를 드래그하세요. PNG / JPG / WebP 지원, 이미지는 로컬에서 처리되며 서버에 업로드되지 않습니다.',
          '<strong>워터마크 텍스트 입력</strong> —— 구체적인 용도와 수신자 이름 명시. 예: "○○은행 주택담보대출 신청 전용", "○○부동산 전월세 심사 2026년 4월". 구체적일수록 오용되기 어렵습니다.',
          '<strong>스타일 조정</strong> —— 배치 방식 선택 (타일이 가장 자르기 방지), 색상 (확실히 강조할 때는 빨강, 차분하게는 회색), 크기, 투명도, 회전 각도, 실시간 미리보기.',
          '<strong>PNG 다운로드</strong> —— 다운로드 버튼을 클릭하여 로컬 저장, 또는 "이미지 복사"로 이메일 / 메신저에 직접 붙여넣기.',
        ],
      },
      faq: {
        heading: '자주 묻는 질문',
        items: [
          {
            q: '내 주민등록증·운전면허증에 워터마크를 추가하는 것이 합법인가요?',
            aHtml:
              '합법입니다. 본인이 소유한 사본 / 스캔본에 "○○ 전용" 텍스트 워터마크를 추가하는 것은 신분증이 다른 용도로 유용되는 것을 방지하는 권장 수단이며, 증명서 자체의 효력에는 영향을 주지 않습니다.',
          },
          {
            q: '워터마크 텍스트에는 무엇을 써야 하나요?',
            aHtml:
              '"용도 + 수신자 + 날짜" 3요소를 포함하는 것을 권장. 예: "○○은행 2026년 주택담보대출 신청 전용", "○○부동산 전월세 심사 2026년 4월". 구체적일수록 오용되기 어렵습니다.',
          },
          {
            q: '워터마크를 어디에 두는 것이 가장 안전한가요?',
            aHtml:
              '타일 모드가 가장 안전합니다 —— 텍스트를 이미지 전체에 대각선으로 깔아 자르기로 제거할 수 없습니다. 우하단 등 모서리 워터마크는 직접 잘리기 쉽습니다. 주민등록증, 운전면허증, 신용카드 등 중요 문서는 타일 + 반투명 회색 권장, 안전하면서도 식별성 유지.',
          },
          {
            q: '이미지가 서버에 업로드되나요?',
            aHtml:
              '아니요. 본 도구의 모든 처리는 브라우저에서 로컬로 완료됩니다 (Canvas 2D 직접 픽셀 그리기). 이미지 파일과 워터마크 텍스트는 사용자 기기를 떠나지 않습니다. 오프라인에서도 계속 사용 가능.',
          },
          {
            q: '워터마크를 PS로 제거할 수 있나요?',
            aHtml:
              '텍스트 워터마크는 본질적으로 보이는 픽셀 변경이므로 숙련자는 PS로 지울 수 있지만 시간이 걸리고 흔적이 남습니다. 일반적인 도용 시나리오에서는 텍스트 워터마크의 억지력으로 충분합니다. 제거 저항성 "보이지 않는 서명"이 필요하다면 <a href="/ko/watermark" class="text-[#0072f5] hover:underline">이미지 숨김 워터마크</a> 도구를 사용하세요.',
          },
          {
            q: '워터마크가 추가된 이미지가 너무 클 때는?',
            aHtml:
              '본 도구는 PNG로 내보냅니다 (무손실, 워터마크 가장자리가 가장 선명). 파일이 너무 커서 업로드나 전송에 영향을 줄 경우 <a href="/ko/compress-png" class="text-[#0072f5] hover:underline">PNG 압축</a>으로 크기를 줄이거나 <a href="/ko/png-to-jpg" class="text-[#0072f5] hover:underline">PNG → JPG</a>로 더 작은 형식으로 변환할 수 있습니다.',
          },
        ],
      },
    },
    json: {
      title:
        'JSON 포매터 - 온라인 미화·압축·검증·API 디버깅용 무료 도구 | WizGo',
      description:
        '무료 온라인 JSON 포매터 도구입니다. 지저분한 JSON 데이터를 보기 좋게 미화하거나 한 줄로 압축하고, 구문 오류를 실시간으로 검증할 수 있습니다. API 응답 디버깅이나 설정 파일 편집에 유용하며, 입력한 데이터는 브라우저에서 처리되어 어떤 서버에도 업로드되지 않습니다.',
      h1: 'JSON 포매터',
      subheading: 'JSON 미화, 압축, 구문 검증 · 브라우저에서 처리',
      schema: {
        name: 'JSON 포매터',
        description: 'JSON 미화, 압축, 검증 도구, 브라우저에서 처리',
      },
      inputLabel: 'JSON 입력',
      formatBtn: '미화',
      minifyBtn: '압축',
      clearBtn: '지우기',
      inputPlaceholder: '{"example": "여기에 JSON 데이터 입력"}',
      resultLabel: '결과',
      copyBtn: '복사',
      copiedBtn: '복사됨',
      outputPlaceholder: '포맷팅된 JSON이 여기에 표시됩니다',
      formatError: 'JSON 형식 오류, 입력을 확인하세요',
    },
    hash: {
      title:
        '해시 생성기 - 텍스트·파일 체크섬·SHA-256 SHA-512 온라인 계산 도구 | WizGo',
      description:
        '텍스트와 파일의 SHA-1, SHA-256, SHA-384, SHA-512 해시를 브라우저에서 생성하는 무료 온라인 체크섬 계산 도구입니다. 소프트웨어 다운로드 후 무결성 검증이나 파일 위변조 확인에 사용할 수 있으며, 모든 처리는 로컬에서 이루어져 데이터가 외부로 유출되지 않습니다.',
      h1: '해시 생성기',
      subheading:
        '파일 무결성 검증 또는 텍스트 해시 계산 · SHA-1 / SHA-256 / SHA-384 / SHA-512 · 브라우저에서 실행',
      schema: {
        name: '해시 생성기',
        description:
          '텍스트나 파일에 대해 SHA-1, SHA-256, SHA-384, SHA-512 해시를 브라우저에서 계산하는 무료 온라인 도구.',
      },
      tabs: { text: '텍스트', file: '파일' },
      input: {
        textLabel: '해시할 텍스트',
        textPlaceholder: '텍스트를 입력하거나 붙여넣기...',
        fileLabel: '해시할 파일',
        fileDrop: '파일을 여기에 놓으세요',
        fileHint: '또는 클릭하여 파일 선택',
        clearBtn: '지우기',
        fileReplace: '다른 파일 선택',
        fileSizeHint: '최대 2GB · 로컬 처리, 업로드 없음',
      },
      output: {
        label: '결과',
        formatLabel: '출력 형식',
        hex: '16진수',
        base64: 'Base64',
        copyBtn: '복사',
        copiedBtn: '복사됨',
        computing: '계산 중...',
        empty: '텍스트를 입력하거나 파일을 선택하면 해시가 표시됩니다',
      },
      algorithms: {
        sha1: 'SHA-1',
        sha256: 'SHA-256',
        sha384: 'SHA-384',
        sha512: 'SHA-512',
      },
      errors: {
        tooLargeTemplate:
          '파일이 너무 큽니다({size}). 최대 지원 크기는 2GB입니다.',
        readFailed: '파일을 읽을 수 없습니다. 다시 시도해주세요.',
        hashFailed:
          '해시 계산 실패. 브라우저가 해당 알고리즘을 지원하지 않을 수 있습니다.',
      },
      tips: {
        heading: '해시에 대하여',
        items: [
          '해시는 고정 길이의 "지문"으로, 동일한 입력은 항상 동일한 해시를 생성합니다.',
          '파일 무결성 확인(다운로드 검증)에는 SHA-256이 가장 많이 사용됩니다.',
          '모든 계산은 브라우저에서 이루어지며, 파일과 텍스트는 어떤 서버로도 전송되지 않습니다.',
          'MD5는 보안성이 약해 포함하지 않았습니다. SHA-256 이상을 사용하는 것이 좋습니다.',
        ],
      },
    },
    mp4ToMp3: {
      title:
        'MP4를 MP3로 변환: 무료 온라인 영상에서 오디오 추출·음성 저장 도구 | WizGo',
      description:
        '동영상 파일에서 오디오 트랙을 추출해 MP3로 저장하는 무료 온라인 변환 도구입니다. MP4, MOV, M4A, WebM 등 다양한 영상 형식을 지원하며, 브라우저에서 직접 처리되어 파일 업로드나 별도 소프트웨어 설치 없이 즉시 사용할 수 있습니다.',
      h1: '영상에서 MP3 추출',
      subheading:
        '영상의 소리를 뽑아냅니다 · 내 기기에서 처리 · 파일은 어디에도 올라가지 않습니다',
      schema: {
        name: 'MP4 → MP3 변환',
        description:
          '무료 온라인 도구 — MP4 영상에서 오디오를 추출해 MP3로 저장. 브라우저에서 동작, 업로드 없음.',
      },
      upload: {
        drag: '영상을 여기에 놓아주세요',
        orClick: '또는 클릭해서 파일 선택 (MP4, MOV, M4A, WebM)',
        sizeHint: '최대 500MB · 한 번에 한 개',
      },
      options: {
        bitrateLabel: '음질:',
        k128: '표준 · 128k',
        k192: '권장 · 192k',
        k256: '고음질 · 256k',
        k320: '최고 · 320k',
        start: 'MP3 만들기',
      },
      progress: {
        preparing: '준비 중...',
        decoding: '오디오 읽는 중...',
        encodingTemplate: '변환 중 · {pct}%',
        done: '완료!',
      },
      errors: {
        tooLargeTemplate:
          '파일이 너무 큽니다. 최대 500MB까지만 가능합니다 (현재 {size})',
        decodeFailedSafari:
          'Safari가 이 파일을 읽지 못했습니다. Safari를 업데이트하거나 Chrome, Firefox로 시도해 보세요.',
        decodeFailedGeneric:
          '이 파일 안의 소리를 읽지 못했습니다. 안의 형식이 흔치 않을 수 있어요.',
      },
      result: {
        ready: 'MP3가 준비됐어요 — 미리듣기 또는 다운로드 가능',
        downloadBtn: '다운로드',
        sizeTemplate: '크기: {size}',
      },
      faq: {
        heading: '자주 묻는 질문',
        items: [
          {
            q: '제 영상이 서버로 올라가나요?',
            a: '아니요. 모든 처리는 브라우저 안에서 끝납니다. 파일은 컴퓨터를 벗어나지 않아요.',
          },
          {
            q: '어떤 영상이 되나요?',
            a: '흔한 영상은 거의 다 됩니다: MP4, 아이폰 MOV, M4A 오디오, WebM. 안 되면 안에 있는 오디오 형식이 좀 특이한 경우입니다.',
          },
          {
            q: 'Safari에서 가끔 실패하는 이유는?',
            a: '구버전 Safari는 일부 MP4의 소리를 읽지 못해요. Safari를 최신으로 업데이트하거나, Chrome / Firefox / Edge로 열어보세요.',
          },
          {
            q: '용량 제한이 있나요?',
            a: '네, 한 파일에 500MB까지요. 더 크면 특히 휴대폰에서 브라우저가 멈출 수 있어요.',
          },
          {
            q: '여러 개를 한 번에 변환할 수 있나요?',
            a: '아직은 안 돼요. 지금은 한 번에 하나씩만 가능합니다.',
          },
        ],
      },
    },
    compressMp3: {
      title:
        'MP3 압축기: 무료 온라인 오디오 파일 크기 줄이기·비트레이트 조절 | WizGo',
      description:
        'MP3 파일의 비트레이트를 조절하여 용량을 줄이는 무료 온라인 압축 도구입니다. 64k에서 320k까지 원하는 품질로 변환 가능하며, WAV, FLAC, M4A, OGG 등 다양한 오디오 형식도 MP3로 압축할 수 있습니다. 브라우저에서 직접 처리되며 파일이 외부로 업로드되지 않습니다.',
      h1: 'MP3 압축',
      subheading:
        '비트레이트를 낮춰 MP3 압축 · 로컬 처리 · 파일이 기기를 떠나지 않음',
      schema: {
        name: 'MP3 압축 도구',
        description:
          '비트레이트를 낮춰 MP3 파일을 압축하는 무료 온라인 도구. 브라우저 내 WebAssembly로 실행.',
      },
      upload: {
        drag: '오디오 파일을 드롭하세요',
        orClick: '또는 클릭하여 선택 (MP3, M4A, WAV, FLAC, OGG)',
        sizeHint: '최대 500MB · 한 번에 한 파일',
      },
      options: {
        bitrateLabel: '목표 비트레이트:',
        k64: '음성 · 64k',
        k96: '음악 · 96k',
        k128: '표준 · 128k',
        k192: '고음질 · 192k',
        start: '압축',
      },
      progress: {
        preparing: '준비 중...',
        decoding: '오디오 읽는 중...',
        encodingTemplate: '압축 중 · {pct}%',
        done: '완료!',
      },
      errors: {
        tooLargeTemplate: '파일이 너무 큽니다. 최대 500MB (현재 {size}).',
        decodeFailedSafari:
          'Safari가 이 파일을 디코딩할 수 없습니다. Safari를 업데이트하거나 Chrome / Firefox를 사용해 보세요.',
        decodeFailedGeneric: '이 파일의 오디오를 디코딩할 수 없습니다.',
      },
      result: {
        ready: '압축 완료',
        downloadBtn: '다운로드',
        sizeTemplate: '크기: {size}',
        reductionTemplate: '{pct}% 절약 · {before} → {after}',
      },
      faq: {
        heading: '자주 묻는 질문',
        items: [
          {
            q: '얼마나 작아지나요?',
            a: '원본 비트레이트에 따라 다릅니다. 320kbps를 128kbps로 압축하면 약 60% 감소, 192kbps를 96kbps로 압축하면 약 50% 감소합니다.',
          },
          {
            q: '음질이 떨어지나요?',
            a: '예, 목표 비트레이트에 따라 다릅니다. 128kbps는 대부분의 음악에서 원음에 가깝고, 96kbps는 스트리밍용, 64kbps는 음성 녹음 전용입니다.',
          },
          {
            q: '오디오가 업로드되나요?',
            a: '아니요. 모든 것은 브라우저의 WebAssembly에서 처리됩니다. 파일이 기기를 떠나지 않습니다.',
          },
          {
            q: 'WAV, FLAC도 사용할 수 있나요?',
            a: '예. 브라우저가 디코딩할 수 있는 모든 형식(WAV, FLAC, M4A, OGG)을 선택한 비트레이트로 MP3로 변환합니다.',
          },
          {
            q: '최대 파일 크기는?',
            a: '파일당 500MB. 더 큰 파일은 브라우저를 멈추게 할 수 있습니다 (특히 모바일에서).',
          },
        ],
      },
    },
    password: {
      title:
        '비밀번호 생성기 - 강력한 무작위 비밀번호·암호 문구 온라인 생성 도구 | WizGo',
      description:
        '무료 온라인 비밀번호 생성기입니다. 문자 유형과 길이를 사용자 정의하여 강력한 무작위 비밀번호를 생성하거나, 기억하기 쉬운 암호 문구(passphrase) 모드를 사용할 수 있습니다. 대문자, 소문자, 숫자, 기호 조합과 유사 문자 제외 기능을 지원하며 모든 생성 과정은 브라우저에서 로컬로 처리됩니다.',
      h1: '비밀번호 생성기',
      subheading:
        '강력한 무작위 비밀번호 생성 · 길이와 문자 유형 사용자 정의 · 로컬 생성',
      schema: {
        name: '비밀번호 생성기',
        description: '사용자 정의 가능한 강력한 무작위 비밀번호 생성',
      },
      modeLabel: '비밀번호 유형',
      mode: {
        random: '무작위 비밀번호',
        passphrase: '암호 문구',
      },
      lengthLabel: '비밀번호 길이',
      wordCountLabel: '단어 수',
      charTypesLabel: '문자 유형',
      separatorLabel: '구분 기호',
      separators: {
        hyphen: '하이픈 (-)',
        underscore: '밑줄 (_)',
        space: '공백 ( )',
        period: '마침표 (.)',
        number: '무작위 숫자',
      },
      charTypes: {
        uppercase: '대문자 (A-Z)',
        lowercase: '소문자 (a-z)',
        numbers: '숫자 (0-9)',
        symbols: '특수 기호 (!@#$%)',
      },
      advanced: {
        label: '고급 옵션',
        excludeSimilar: '유사 문자 제외 (i, l, 1, L, o, 0, O)',
        excludeAmbiguous:
          '모호한 기호 제외 ({ } [ ] ( ) / \\ \' " ` ~ , ; : . < >)',
      },
      generateBtn: '비밀번호 생성',
      copyBtn: '복사',
      copiedBtn: '복사됨',
      regenerateBtn: '재생성',
      resultLabel: '생성된 비밀번호',
      strength: {
        label: '비밀번호 강도',
        weak: '약함',
        fair: '보통',
        good: '양호',
        strong: '강함',
      },
      info: {
        heading: '비밀번호 보안 팁',
        body: '비밀번호는 길수록 더 안전합니다. 최소 12자 이상의 대문자, 소문자, 숫자 및 기호 조합을 권장합니다. 여러 사이트에서 동일한 비밀번호를 재사용하지 마세요. 생성된 비밀번호는 비밀번호 관리자에 저장하는 것을 고려하세요.',
      },
    },
    pdfCompress: {
      title:
        'PDF 압축기: 무료 온라인 PDF 파일 크기 줄이기·용량 감소 도구 | WizGo',
      description:
        'PDF 파일의 오브젝트 스트림을 재작성하고 메타데이터를 제거하여 용량을 줄이는 무료 온라인 PDF 압축 도구입니다. 브라우저에서 로컬로 처리되며 파일이 서버에 업로드되지 않아 개인정보가 안전하게 보호됩니다. 이미지 품질은 그대로 유지하면서 파일 크기를 효과적으로 최적화할 수 있습니다.',
      h1: 'PDF 압축',
      subheading: 'PDF 파일 크기 줄이기 · 로컬 처리 · 업로드 없음',
      schema: {
        name: 'PDF 압축',
        description:
          '오브젝트 스트림 재작성 및 메타데이터 제거로 PDF 파일을 압축하는 무료 온라인 도구. 브라우저에서 실행.',
        browserReq: 'File API를 지원하는 최신 브라우저',
      },
      upload: {
        drag: 'PDF를 여기에 놓으세요',
        orClick: '또는 클릭하여 업로드',
        pasteHint: '또는 ⌘V / Ctrl+V로 붙여넣기',
        sizeHint: '파일당 최대 200MB · 일괄 처리 가능',
      },
      options: {
        stripMetadataLabel: '메타데이터 제거',
        stripMetadataHint: '제목, 작성자, 키워드, 생성자 정보 삭제',
        objectStreamNote:
          '오브젝트 스트림 압축은 항상 활성화되어 있습니다. 본 버전은 이미지를 재인코딩하지 않으며, 5~15%의 용량 감소가 예상됩니다.',
        start: '압축 시작',
      },
      progress: {
        preparing: '준비 중...',
        processingTemplate: '처리 중 · {cur}/{total}',
        done: '완료',
      },
      result: {
        ready: '압축 완료',
        downloadBtn: '다운로드',
        sizeTemplate: '크기: {size}',
        reductionTemplate: '{pct}% 감소 · {before} → {after}',
        noReduction: '더 이상 줄일 수 없어 원본을 반환합니다',
      },
      errors: {
        tooLargeTemplate: '{name}이(가) 너무 큽니다 — 최대 200MB (현재 {size})',
        notPdfTemplate: '{name}은(는) PDF 파일이 아닙니다',
        loadFailedTemplate: 'PDF를 읽을 수 없습니다: {name}',
        encryptedPdf: '암호화되거나 비밀번호로 보호된 PDF는 지원하지 않습니다',
      },
      faq: {
        heading: '자주 묻는 질문',
        items: [
          {
            q: 'PDF가 얼마나 작아지나요?',
            a: '원본에 따라 보통 5~15% 감소합니다. 이미 최적화된 PDF는 감소 폭이 적습니다. 이미지가 많은 PDF는 V2의 이미지 재인코딩 기능을 통해 50~80%까지 감소할 전망입니다.',
          },
          {
            q: '품질이 떨어지나요?',
            a: '아니요. V1은 오브젝트 스트림 재작성과 메타데이터 제거만 수행하며, 이미지·폰트·텍스트의 픽셀은 그대로 유지됩니다.',
          },
          {
            q: '파일이 업로드되나요?',
            a: '아니요. pdf-lib로 브라우저에서 처리되어 파일은 기기 밖으로 나가지 않습니다.',
          },
          {
            q: '암호화된 PDF를 지원하나요?',
            a: 'V1에서는 지원하지 않습니다. 비밀번호 PDF는 오류가 발생하므로 먼저 보호를 해제해야 합니다.',
          },
          {
            q: '가끔 오히려 용량이 커지는 이유는?',
            a: '이미 고도로 최적화된 파일은 재작성 후 몇 KB가 늘어날 수 있습니다. 이 경우 "더 이상 줄일 수 없음"이 표시되며 원본을 다운로드할 수 있습니다.',
          },
        ],
      },
    },
    pdfMerge: {
      title:
        'PDF 병합기: 무료 온라인 여러 PDF 합치기·순서 변경·드래그 앤 드롭 | WizGo',
      description:
        '여러 개의 PDF 파일을 하나로 합치는 무료 온라인 병합 도구입니다. 드래그 앤 드롭으로 파일 순서를 자유롭게 변경할 수 있으며, 브라우저에서 로컬로 처리되어 문서가 서버에 업로드되지 않습니다. 개인정보 보호가 중요한 업무 문서도 안심하고 병합할 수 있습니다.',
      h1: 'PDF 병합',
      subheading: '여러 PDF를 하나로 합치기 · 순서 조정 가능 · 업로드 없음',
      schema: {
        name: 'PDF 병합',
        description:
          '여러 PDF를 하나의 문서로 병합하며, 순서 변경도 지원합니다. 브라우저에서 실행되는 무료 온라인 도구.',
        browserReq: 'File API를 지원하는 최신 브라우저',
      },
      upload: {
        drag: 'PDF를 여기에 놓으세요',
        orClick: '또는 클릭하여 업로드 (다중 선택 가능)',
        pasteHint: '또는 ⌘V / Ctrl+V로 붙여넣기',
        sizeHint: '파일당 최대 200MB',
        multipleHint: '병합하려면 PDF 2개 이상이 필요합니다',
      },
      list: {
        emptyHint: '먼저 PDF를 2개 이상 업로드하세요',
        moveUpAria: '위로 이동',
        moveDownAria: '아래로 이동',
        removeAria: '제거',
        positionTemplate: '{i}/{total}',
      },
      options: {
        mergeBtn: 'PDF 병합',
        clearAllBtn: '모두 지우기',
        minFilesHint: '병합하려면 파일이 2개 이상 필요합니다',
      },
      progress: {
        preparing: '준비 중...',
        loadingTemplate: '로드 중 · {cur}/{total}',
        writing: '쓰는 중...',
        done: '완료',
      },
      result: {
        ready: '병합 완료',
        downloadBtn: '다운로드',
        sizeTemplate: '크기: {size}',
        pageCountTemplate: '총 {pages} 페이지',
      },
      errors: {
        tooLargeTemplate: '{name}이(가) 너무 큽니다 — 최대 200MB (현재 {size})',
        notPdfTemplate: '{name}은(는) PDF 파일이 아닙니다',
        loadFailedTemplate: 'PDF를 읽을 수 없습니다: {name}',
        encryptedPdf: '암호화되거나 비밀번호로 보호된 PDF는 지원하지 않습니다',
        needTwoFiles: 'PDF가 2개 이상 필요합니다',
      },
      faq: {
        heading: '자주 묻는 질문',
        items: [
          {
            q: '파일이 업로드되나요?',
            a: '아니요. pdf-lib로 브라우저에서 처리되어 파일은 기기 밖으로 나가지 않습니다.',
          },
          {
            q: '파일 개수 제한이 있나요?',
            a: '엄격한 제한은 없지만 큰 파일 20개 이상을 병합하면 브라우저가 느려질 수 있습니다(특히 모바일).',
          },
          {
            q: '순서를 바꿀 수 있나요?',
            a: '네. 각 파일 옆의 ▲ / ▼ 버튼으로 순서를 조정할 수 있으며, 목록 순서대로 병합됩니다.',
          },
          {
            q: '암호화된 PDF를 지원하나요?',
            a: 'V1에서는 지원하지 않습니다. 비밀번호 PDF는 오류가 발생하므로 먼저 보호를 해제해야 합니다.',
          },
          {
            q: '북마크와 목차는 유지되나요?',
            a: 'V1은 페이지 내용만 유지하며 문서 수준의 북마크, 폼 필드, 링크 주석은 제거될 수 있습니다.',
          },
        ],
      },
    },
  },
} satisfies Translations;
