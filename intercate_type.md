# 타입 별칭(type alias)과 인터페이스(interface)

## 타입 별칭

재사용하는 타입에 더 쉬운 이름을 할당하는 타입 별칭Type alias이 있습니다. 타입 별칭은 순전히 ‘개발 시’에만 존재하며, 자바스크립트로 컴파일되면 사라집니다.

```jsx
type RawData = boolean | number | string | null | undefined;

let rawDataFirst: RawData;
let rawDataSecond: RawData;
let rawDataThird: RawData;
```

## 타입별칭, 인터페이스의 props 타입을 정의하는 방법

```jsx

// 타입 별칭
type Props = {
name: string;
age: number;
};

// 인터페이스
interface Props {
name: string;
age: number;
}

// 타입 별칭
const person = { name: "John", age: 20 };

// 인터페이스
const person = { name: "John", age: 20 };

// 타입 검사
const person = { name: "John", age: 20 };

if (person instanceof Props) {
console.log("person은 Props 타입입니다.");
} else {
console.log("person은 Props 타입이 아닙니다.");
}

const person = { name: "John", age: 20 };

if (person implements Props) {
console.log("person은 Props 인터페이스를 구현합니다.");
} else {
console.log("person은 Props 인터페이스를 구현하지 않습니다.");
}
```

👉🏻 이 예에서 타입 별칭과 인터페이스는 모두 동일한 타입을 정의하나
인터페이스는 타입 검사를 더 엄격하게 수행함!
-> 타입 별칭은 일반적으로 더 간단하고 가벼운 유형 검사가 필요한 경우에 사용.
-> 인터페이스는 더 강력한 유형 검사가 필요한 경우에 사용됩니다.

## 공통점과 차이점

### 공통점

- 객체의 타입을 정의하는 데 사용

### 차이점

- 객체의 타입을 정의하는 방식의 차이
- **타입 별칭** :
  - 단순히 다른 이름으로 객체의 타입을 정의
  - 더 간단하고 가볍기 때문에 일반적으로 인터페이스보다 선호.
- **인터페이스** :

  - 객체가 가져야 할 속성과 메서드를 정의.
  - 타입 별칭보다 더 강력한 유형 검사를 제공

- **상세요약**
  - `Interface`는 **속성 증가를 위해 병합merge** 할 수 있습니다. 이 기능은 내장된 전역 `Interface` 또는 npm 패키지와 같은 외부 코드를 사용할 때 특히 유용합니다.
  - `interface`는 클래스가 선언된 구조의 타입을 확인하는 데 사용할 수 있지만 **타입 별칭을 사용할 수 없습니다**.
  - 일반적으로 `interface`에서 typescript 타입 검사기가 더 빨리 작동합니다. interface는 type alias이 하는 것처럼 새로운 객체 리터럴의 동적인 복사 붙여넣기보다 **내부적으로 더 쉽게 캐시할 수 있는 명명된 타입을 선언**합니다.
  - `interface`는 이름없는 객체 리터럴의 별칭이 아닌 이름 있는 (명명된) 객체로 간주되므로 **어려운 특이케이스에서 나타나는 오류 메시지를 좀 더 쉽게 읽을 수 있습니다**.

### 주요 차이점의 실예시

1. **확장성(Extensibility)**: 인터페이스는 동일한 이름으로 여러 번 선언할 수 있으며, 선언된 것들이 자동으로 병합. 반면에 타입 별칭은 확장 또는 병합이 불가능합니다.

```jsx
interface IUser {
  name: string;
}

interface IUser {
  age: number;
}

// 병합된 인터페이스
/*
interface IUser {
  name: string;
  age: number;
}
*/

type TUser = {
  name: string,
};

// 에러: 중복된 이름에 대해 타입 별칭을 선언할 수 없습니다.
type TUser = {
  age: number,
};
```

2. **구현 및 확장**: 인터페이스는 클래스에서 구현할 수 있으며, 다른 인터페이스를 확장(extends)할 수도 있습니다. 타입 별칭에서는 이 같은 방식이 불가능합니다.

```jsx
interface IPerson {
  name: string;
}

interface IEmployee extends IPerson {
  title: string;
}

class Employee implements IEmployee {
  name: string;
  title: string;
}
```

3. **표현력** : 타입 별칭은 `유니온 타입, 튜플, 기본 타입 및 리터럴 타입 등과 함께 사용`할 수 있습니다. 인터페이스에서는 이러한 방식이 불가능합니다.

```jsx
type State = "active" | "inactive";

type Coordinates = [number, number, number];
```

## 그럼 어느떄 어느것을 사용하는게 좋을까?

1. 클래스와의 상호 작용이 필요한 경우, 인터페이스를 사용하세요.
2. 다른 인터페이스를 확장해야 할 때에는 인터페이스를 사용하세요.
3. 객체의 구조가 간단한 경우, 타입 별칭을 사용하세요.
4. 유니온 타입, 기본 타입, 튜플, 리터럴 타입 등과 같은 다양한 타입을 사용해야 하는 경우, 타입 별칭을 사용하세요.

## 타입별칭과 인터페이스.. 혼용해서 사용할 수 있을까?

👉🏻 정답은 ...! 가능하다!!

- 서로 다른 유형 간의 관계를 정의하는 데 사용가능!
- 예) 인터페이스를 사용하여 객체의 구조를 정의 + 타입 별칭을 사용하여 유니온 타입을 정의하는 경우의 사례

```jsx
interface Fruit {
  name: string;
  taste: string;
}

interface Vegetable {
  name: string;
  vitamin: number;
}

type market = Fruit | Vegetable;

const apple: market = { name: "apple", taste: "sweet" };
const carrot: market = { name: "carrot", vitamin: 50 };

function showItemInfo(item: market) {
  if ("taste" in item) {
    console.log(`Fruit: ${item.name}, Taste: ${item.taste}`);
  } else {
    console.log(`Vegetable: ${item.name}, Vitamin Contents: ${item.vitaminContents}`);
  }
}

showItemInfo(apple);
showItemInfo(carrot);
```

## 소소한 질문 or 정보

1. 타입별칭과 인터페이스의 런타임 성능에 차이가 있을까?

- 랜더링 성능이나 메모리 사용량에 직접적인 영향을 미치지 않는다.
- TypeScript로 개발하는 과정에서 타입 검사 및 제안을 도와주는 역할을 하지만, 최종적으로 JavaScript로 변환/컴파일되어 해당 타입의 정보는 사라지기 떄문이다.

2. 인터페이스를 정의할때는 주로 I를 앞에 붙여준다.

- 하지만 Typescript 팀의 스타일 가이드에서는 이걸 권장하지는 않는다.
