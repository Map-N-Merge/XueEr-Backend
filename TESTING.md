# Testing Guide

本專案使用 **Vitest** 作為測試框架，提供快速且現代化的測試體驗。

## 🧪 測試結構

```
src/test/
├── setup.ts        # 測試環境設置
├── api.test.ts     # API 端點測試
└── config.test.ts  # 環境配置測試
```

## 🚀 測試指令

### 基本測試指令

```bash
# 運行所有測試
pnpm test

# 運行測試一次（CI 模式）
pnpm test:run

# 運行測試並生成覆蓋率報告
pnpm test:coverage

# 啟動測試 UI 界面
pnpm test:ui
```

### 開發時的測試

```bash
# 監視模式 - 文件變更時自動重新運行測試
pnpm test
```

## 📊 測試覆蓋率

測試覆蓋率報告會在運行 `pnpm test:coverage` 後生成：

- **文字報告**: 直接在終端顯示
- **HTML 報告**: `coverage/index.html`
- **JSON 報告**: `coverage/coverage.json`

## 🔧 測試配置

### Vitest 配置文件

`vitest.config.ts` 包含以下主要設定：

- **環境**: Node.js 環境
- **全域變數**: 啟用 `describe`, `it`, `expect` 等全域函數
- **覆蓋率提供者**: V8
- **設置文件**: 自動載入 `src/test/setup.ts`

### 測試環境變數

測試會自動設置必要的環境變數，不需要真實的 Firebase 配置。

## 🎯 測試類型

### 1. API 測試 (`api.test.ts`)

測試所有的 API 端點：

- ✅ Health Check 端點
- ✅ 測試 API 端點
- ✅ 404 錯誤處理
- ✅ CORS 設定
- ✅ 安全標頭 (Helmet)

### 2. 配置測試 (`config.test.ts`)

測試環境變數和配置：

- ✅ 必要環境變數驗證
- ✅ 預設值設定

## 📝 撰寫新測試

### API 端點測試範例

```typescript
import request from 'supertest';
import { describe, expect, it } from 'vitest';

import app from '../app';

describe('New API Endpoint', () => {
  it('should return expected response', async () => {
    const response = await request(app).get('/api/new-endpoint').expect(200);

    expect(response.body).toMatchObject({
      success: true,
      data: expect.any(Object),
    });
  });
});
```

### 單元測試範例

```typescript
import { describe, expect, it } from 'vitest';

import { myFunction } from '../utils/myFunction';

describe('myFunction', () => {
  it('should return expected result', () => {
    const result = myFunction('input');
    expect(result).toBe('expected output');
  });
});
```

## 🔍 最佳實踐

### 1. 測試結構

- 使用 `describe` 群組相關測試
- 使用描述性的測試名稱
- 遵循 AAA 模式 (Arrange, Act, Assert)

### 2. 環境設定

- 在 `beforeAll` 設置測試資料
- 在 `afterAll` 清理資源
- 使用模擬資料，避免依賴外部服務

### 3. 斷言

- 使用具體的斷言而非通用的
- 測試邊界條件和錯誤情況
- 驗證重要的業務邏輯

## 🚫 常見問題

### Q: 測試失敗因為缺少環境變數？

A: 檢查 `setup.ts` 和各個測試文件中的 `beforeAll` 設定是否正確設置了所需的環境變數。

### Q: 如何模擬 Firebase 服務？

A: 目前測試使用假的環境變數，如需要真實的 Firebase 功能測試，可以使用 Firebase 模擬器。

### Q: 如何跳過特定測試？

A: 使用 `it.skip()` 或 `describe.skip()` 來跳過測試。

## 📈 CI/CD 整合

GitHub Actions 會自動運行：

1. TypeScript 類型檢查
2. ESLint 代碼檢查
3. Prettier 格式檢查
4. **測試執行**
5. 專案構建

所有檢查都必須通過才能合併代碼。
