export const codeJsonCompress = `{
  "foo": "bar",
  "hello": "world"
}`;
export const codeJsonFormat = `{"foo":"bar","hello":"world"}`;
export const codeJsonParser = `{\"d\":\"{\\\"c\\\":\\\"{\\\\\\\"b\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"a\\\\\\\\\\\\\\\":1}\\\\\\\"}\\\"}\"}`;
export const codeJsonSort = `{
  "foo": "bar",
  "hello": "world",
  "a": 1,
  "d": 2,
  "c": 1,
  "b": {
    "c": 3,
    "b": 2,
    "a": 1
  }
}`;
export const codeJson2Ts = `{
  "foo":"bar",
  "hello":"world",
  "test": {
    "a": 1
  }
}`;
export const codeJsonFlat = `{
  "a1": {
    "a2": 1
  },
  "b1": {
    "a2": 2
  },
  "c1": {
    "a2": 3
  }
}`;
export const codeJsonNesting = `{
  "a1.a2": 1,
  "b1.a2": 2,
  "c1.a2": 3
}`;

export const codeJsonYaml = `{
  "name": "张三",
  "age": 30,
  "address": {
    "street": "人民路",
    "city": "北京"
  },
  "hobbies": ["阅读", "游泳"]
}`;

export const codeYamlJson = `name: 张三
age: 30
address:
  street: 人民路
  city: 北京
hobbies:
  - 阅读
  - 游泳
`;
export const codeJsonCsv = `[{
  "a1": 1,
  "a2": 2,
  "a3": 3
}]`;

export const codeCsvJson = `Column 1,Column 2,Column 3,Column 4
1-1,1-2,1-3,1-4
2-1,2-2,2-3,2-4
3-1,3-2,3-3,3-4
4,5,6,7`;

export const codeObjectJson = `{
  a: 1,
  b: 2,
  c: 3
}`;

export const codeJson2Obj = `{
  "a": 1,
  "b": 2,
  "c": 3
}`;

export const codeSize = `计算字符串所占的内存字节数，
使用 UTF-8 和 UTF-16 的编码方式计算。
UTF-8 和 UTF-16 都是 Unicode 标准的字符编码方案，
但它们的设计选择导致了截然不同的特性和适用场景。
  - UTF-8 使用 1 到 4 个字节 的变长编码来表示一个字符。核心特点：向后兼容 ASCII。
  - UTF-16 使用 2 或 4 个字节 的变长编码来表示一个字符。核心特点：表示非 ASCII 字符通常只需要 2 个字节。
对于 CJK 文本（中文/日文/韩文），UTF-8 通常需要 3 个字节来表示一个字符，而 UTF-16 通常只需要 2 个字节。
对于英文文本，UTF-8 通常需要只需要 1 个字节，而 UTF-16 通常需要 2 个字节来表示一个字符。
因此，在英文文本中，UTF-8 通常是更节省空间的选择，而在 CJK 文本中，UTF-16 通常是更节省空间的选择。
由于 UTF-8 兼容 ASCII，因此在绝大多数现代应用中，UTF-8 是默认选择。`;

export const codeTextSort = `3. 按字典序排序
1. 对文本进行排序
2. 每行一个字符串
`;

export const codeBase64Encode = `你好世界`;
export const codeBase64Decode = `5L2g5aW95LiW55WM`;
export const codeUrlEncode = `你好世界`;
export const codeUrlDecode = `%E4%BD%A0%E5%A5%BD%E4%B8%96%E7%95%8C`;
export const codeCspParse = `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' cdn.example.com; style-src 'self' fonts.example.com; img-src 'self' data: example.com; font-src 'self' data: fonts.example.com; form-action 'self'`;
export const codeCspUnparse = `{
  "default-src": ["'self'"],
  "script-src": ["'self'","'unsafe-inline'", "'unsafe-eval'", "cdn.example.com"],
  "style-src": ["'self'", "fonts.example.com"],
  "img-src": ["'self'", "data:", "example.com"],
  "font-src": ["'self'", "data:", "fonts.example.com"],
  "form-action": ["'self'"]
}`;

export const codeHttpCacheAnalyze = `Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
Cache-Control: max-age=604800`;

export const codeHttpCorsAnalyze = `Content-Type: application/json
Content-Length: 123
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: X-Custom-Header, X-Another-Header
Access-Control-Max-Age: 86400`;

export const codeSqlFormat = `SELECT id, name, email, created_at FROM users WHERE status = 'active' AND created_at > '2023-01-01' ORDER BY created_at DESC LIMIT 10;`;

export const codeSqlCompress = `SELECT 
  id, 
  name, 
  email, 
  created_at 
FROM 
  users 
WHERE 
  status = 'active' 
  AND created_at > '2023-01-01' 
ORDER BY 
  created_at DESC 
LIMIT 10;`;

export const codeSemiSplit = `localhost;127.*;10.*;192.168.*`;
export const codeCommaSPlit = `a,b,c`;
export const codeLineSplit = `a
b
c
d
e
f`;