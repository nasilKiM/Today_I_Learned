# (주제2) enum과 as const, tree shaking이란? 그렇다면 enum은 절대 사용하지 말아야하나?

![congrats!](image-1.png)

### 들어가며...

    Typescript에서 상수를 관리하기 위해 어떤 기능이 있을까?

- **리터럴 타입** <br/>
  : typescript에서는 포괄적인 타입(string, number, ....) 외에도 정확한 값을 설정하는 것이 가능

  ```tsx
  let title: "typescript";
  title = "javascript";
  ```

  위와 같이 입력하면 컴파일 에러가 발생.
  typescript 문자열을 title의 타입으로 부여했기 때문.

- **타입추론** <br/>
  : typescript 3.4에서부터는 일일히 타입을 선언하지 않고도 컴파일러가 자동으로 타입을 추론하는 기능을 제공

  #### 타입추론에서의 let, const

  ```tsx
  let title = "typescript";
  ```

  위와 같이 선언하면 title의 type을 string으로 추론 <br/>
  반면 const 와 같은 경우는,

  ```tsx
  const title = "typescript";
  ```

  자동으로 title의 type을 리터럴 타입인 “typescript”를 추론

  **이런 차이가 발생하는 이유는 무엇일까요?**

  ☝🏻 `let`은 변수의 값을 언제든 바꿀 수 있고, `const`는 변경할 수 없기 때문! <br/>그래서 `let`의 경우 좀 더 포괄적인 개념의 primitive type(string)으로 값을 추론하고, `const`의 경우는 변경이 불가능하기 때문에 literal type인 "typescript"로 추론하는 것.

- **타입 단언하기 (const assertion)** <br/>
  : `let` 도 `const처럼 literal type으로 추론`할 수 있는 방법 === **`as const`**

<br/>

## as const ( == const assertion)

### as const 란?

    변수 선언문 뒤에 as const를 추가하거나, 리터럴 앞에 <const>를 붙이면 적용됨 -> 단, tsx파일에서는 <const> 사용불가.

- 상수 타입: 값의 타입이 변경되지 않는 상수 타입으로 지정.
- 타입 유지: 프로퍼티들의 타입이 보존 -> 다른 변수에 할당할 때도 타입 정보를 유지
- 읽기 전용(readonly): 프로퍼티들은 읽기 전용으로 간주 = 값변경 시도 시, 컴파일 에러
- 객체 불변성: 객체 내부 프로퍼티들 변경 제한

### 장점과 단점

- 🩷 타입 안정성: 값의 변경을 방지하여 타입 안정성을 확보
- 🩷 트리 쉐이킹: 값이 컴파일 타임에 이미 결정되었다고 인식 -> 트리 쉐이킹 최적화에 도움됨
- 💔 가독성: as const로 상수를 표현하면, 값 자체가 보다 간단해지기 때문에 의미 파악이 어려울 수 있습니다. === 값이 복잡한 구조나 계층을 가지더라도 그 구조를 모두 제거하고 최종 값만 표현하는 것을 의미!!
- 💔 엄격한 타입 제약: 타입의 유연성이 제한됨 === 이 값의 프로퍼티들은 더 이상 변경되지 않으며, 해당 값은 리터럴 타입으로 간주

<br/>

## enum

### enum 이란?

- 열거형 타입(Enumerated Type)을 앞 글자를 따와서 만들어진 단어
- 숫자와 문자열 기반의 열거형으로 이름이 있는 상수들의 집합을 정의할 수 있음. = 연관된 값을 묶어 상수 그룹을 나타냠
- Javascript에는 존재하지 않는 `Typescript 만의 기능`
- 숫자 값: enum 멤버는 숫자 값으로 지정, 0부터 순차 증가
- 명시적 값 할당: enum 멤버에 명시적으로 값을 할당 가능.
- 컴파일된 객체: enum은 컴파일된 코드에서 객체로 표현되며, 런타임에도 객체로 동작
  ```tsx
  const keys = Object.keys(LanguageCode); // ['korean', 'english', ...]
  const values = Object.values(LanguageCode); // ['ko', 'en', ...]
  ```

### 장점과 단점

- 🩷 가독성: 값을 의미 있는 이름으로 표현할 수 있어 가독성을 높임.
- 🩷 코드 유지보수성: 값들의 그룹을 하나의 enum으로 관리하면, 코드 변경 시, 일관되게 값 관리 가능
- 💔 트리 쉐이킹 문제: enum은 런타임에도 객체로 동작하기 때문에 트리 쉐이킹 최적화에 어려움을 줄 수 있습니다.
- 💔 가변성: enum 멤버의 값을 변경할 수 없기 때문에, 일부 상황에서 유연성이 제한될 수 있습니다.
- 💔 디버깅 주의 : 디버깅 시에 숫자 값이 출력되거나 예상치 않은 결과를 볼 수 있습니다

## <br/>

```
### 나의 궁금점

🤔 * 튜플이랑 뭐가 다르지?

- 튜플 : 특정 타입이나 값을 고정하는 배열
- enum : 특정 값을 고정하는 또다른 독립된 자료형

🤔 * 타스만의 기능이라고? 그럼 자바스크립트로 어떻게 변환이 되는거지?
    참고 : [enum의자바스크립트변환](https://velog.io/@hhhminme/%EB%84%A4-Enum-%EB%88%84%EA%B0%80-Typescript%EC%97%90%EC%84%9C-Enum%EC%9D%84-%EC%93%B0%EB%83%90)


🤔 * enum 은 객체라던데... 그럼 그냥 객체를 사용하는 것과 어떤 차이가 있을까?
    1. 객체 : 속성 자유로이 변경가능 (추가처리사항이 없다면)
       enum :  속성 변경불가

    2. 객체의 속성 : 리터럴의 타입 X 더 넓은타입으로 추론됨. (추가처리사항이 없다면)
       enum의 속성 : 항상 리터럴 타입

    3. 객체의 속성 값 : JavaScript가 허용하는 모든 값
       enum의 속성 값 : 문자열 또는 숫자만 허용


ps. 객체 리터럴에 대해 상수 단언(const assertion)을 해준다면 이 객체를 enum과 비슷한 방식으로 사용할 수 있습니다. (위 as const 참고)

```

---

<br/>
<br/>

## Tree Shaking

     나무를 흔들어서 죽은 잎사귀나 열매를 떨어트리는 이미지를 생각해보자. 🍂
     간단하게 말해서 프로젝트에서 사용하지 않는 코드(함수,변수,모듈 등)를 자동 삭제하는 기능!

### 코드 분석과 빌드 도구 사용에 용이!

- 트리 쉐이킹은 정확한 분석과 최적화를 필요. 어떤 코드가 최종적으로 사용되는지 파악하기 위해 빌드 도구나 트리 쉐이킹 관련 도구를 활용하는 것이 중요!

### Webpack 및 Rollup과의 조합

- 트리쉐이킹을 지원하는 도구 = 웹팩(Webpack)과 롤업(Rollup). 이러한 도구를 활용하여 프로젝트 내 코드가 최적화되도록 설정

### TypeScript에서 `enum을 사용하면 Tree-shaking이 되지 않습니다`

#### 1. enum은 런타임에 동작하는 일종의 객체

- 이 말인즉슨, enum은 컴파일된 코드에서 객체로 동작하기에 트리 쉐이킹이 제대로 동작하기 않아 사용하지 않는 enum 파일을 제거하기 어렵다는 것!

```tsx
enum Status {
  Active,
  Inactive,
}
function processStatus(status: Status) {
  if (status === Status.Active) {
    // ...
  } else {
    // ...
  }
}
const currentStatus = Status.Active;
processStatus(currentStatus);
```

👉 processStatus 함수 내부에서 Status.Active와 Status.Inactive가 사용되는 것을 확인하기가 어려움.
=== 트리 쉐이킹 최적화가 제대로 이루어지지 않을 수 있음!

🤔 **그럼 트리쉐이킹에 효과적인 작동을 위해서는 어떻게 해야할까?**
<br/> 상수 변수나 타입 리터럴을 사용하자!

- 상수 변수는 런타임에 값이 변하지 않는 것으로 간주되어 최적화에 용이
- 타입 리터럴은 컴파일 타임에 타입 정보만을 가지고 있기 때문에 트리 쉐이킹에 더 적합

#### 2. 미리 컴파일된 코드와의 조합

미리 컴파일된 코드와 함께 enum을 사용하는 경우에도 트리 쉐이킹에 주의해야 합니다. 미리 컴파일된 코드와 다이나믹 로딩이 결합되는 경우 트리 쉐이킹 최적화가 예상대로 작동하지 않을 수 있습니다.

<br/>
<br/>

## 그럼, enum 은 사용하지 말아야 하나?

    결론부터 말하자면, 꼭 그렇지는 않다.

### enum을 도입할 때 고려해야 할 것 (출처 url 내 bang9dev님께서 남겨주신 댓글)

#### - `번들러에서 tree shaking 을 지원하는지에 대한 고려도 필요합니다.`

(fyi, React Native 의 Metro bundler 는 tree shaking 을 지원하지 않습니다.)

#### - `tree shaking 은 기본적으로 사용되지 않은 코드를 제거하는데 의미가 있습니다. 즉, 작성한 코드가 사용되지 않을수도 있다는 전제조건이 깔려야 합니다.`

다른 사람이 import 해서 사용하는 서드 파티 라이브러리를 개발한다면 그럴 가능성이 높겠지만, 일반적인 어플리케이션이라면 우리가 enum 을 선언하고 사용하지 않을 확률이 얼마나 될까? 라는 관점에서도 고려해볼 수 있습니다.
(enum 이 가져다주는 생산성 vs 사용될 가능성이 높은 코드에 트리 쉐이킹을 고려해서 얻는 이득)

### 결론 : 언제 enum이 효과적일까?

보통 도메인을 설계할 때 사용하는 인스턴스의 수가 정해져 있고 관련된어 처리할 수 있는 상수값이 여러개 존재할 때!

ex) 로또 (등수, 등수 조건, 상금)

```tsx
enum LottoRank {
FIRST(6, false, 2_000_000_000),
SECOND(5, true, 30_000_000),
THIRD(5, false, 1_500_000),
FOURTH(4, false, 50_000),
FIFTH(3, false, 5_000),
NONE(0, false, 0);
}
```

---

ex) 전세계의 언어코드를 등록할 때

**예시는 출처의 예시를 동일하게 가지고 왔습니다.**
[TypeScript enum을 사용하는 이유
](https://medium.com/@seungha_kim_IT/typescript-enum%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-3b3ccd8e5552)

```tsx
const code: string = "en"; // string?
```

🧐 **언어를 string으로 타입지정하는게 옳은걸까?** <br/>
범위가 너무 넓다는 느낌이 들지 않나? 그렇다면 이를 개선해봅시다.

- 리터럴타입과 유니온을 이용해 code 변수에 대한 타입범위를 줄일 수 있다.

```tsx
type LanguageCode = "ko" | "en" | "ja" | "zh" | "es";
const code: LanguageCode = "ko";
```

타입의 범위는 좁혀졌지만, 제품이 어떤 언어를 지원하기로 했었는지, 특정 국가 코드가 정확히 어떤 언어를 가리키는지 다 외우기 쉽지 않습니다.

그렇다면, 상수를 여러 개 둬서 문제를 해결할 수는 있을까?

```tsx
const korean = "ko";
const english = "en";
const japanese = "ja";
const chinese = "zh";
const spanish = "es";
// 이렇게 하면 언어 코드가 위아래에 중복되고
type LanguageCode = "ko" | "en" | "ja" | "zh" | "es";
// 이렇게 하면 코드가 너무 길어집니다
// type LanguageCode = typeof korean | typeof english | typeof japanese | typeof chinese | typeof spanish
const code: LanguageCode = korean;
```

이런 경우에 enum을 사용해 리터럴의 타입과 값에 이름을 붙여서 코드의 가독성을 크게 높일 수 있습니다.

```tsx
export enum LanguageCode {
  korean = "ko",
  english = "en",
  japanese = "ja",
  chinese = "zh",
  spanish = "es",
}
// 여기서
// LanguageCode.korean === 'ko'
// (의미상) LanguageCode === 'ko' | 'en' | 'ja' | 'zh' | 'es'
const code: LanguageCode = LanguageCode.korean;
```

<br/>

### ⭐️⭐️⭐️ 결론 ⭐️⭐️⭐️

#### `같은 ‘종류’를 나타내는 여러 개의 숫자 혹은 문자열`을 다뤄야 하는데, <br/>`각각 적당한이름을 붙여서 코드의 가독성을 높이고 싶다면` enum을 사용!! <br/> 그 외의 경우 상수, 배열, 객체 등을 사용하자.

<br/>
<br/>
      
### 참고

https://xpectation.tistory.com/218
https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking
https://blog.toycrane.xyz/
https://velog.io/@vraimentres/typescript-enum
https://medium.com/@seungha_kim_IT/typescript-enum%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-3b3ccd8e5552
https://velog.io/@hhhminme/%EB%84%A4-Enum-%EB%88%84%EA%B0%80-Typescript%EC%97%90%EC%84%9C-Enum%EC%9D%84-%EC%93%B0%EB%83%90
