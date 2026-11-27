# 도면·가구·배치 파일 형식

앱이 읽고 쓰는 JSON 파일 세 가지의 형식이다. TypeScript 타입은 [shared/types.ts](../shared/types.ts)에 같은 내용으로 있다. 평면도 캡처를 Claude로 변환할 때도 이 형식으로 만들게 한다.

## 단위와 좌표

- 길이는 모두 cm다.
- 도면을 위에서 본다. x는 오른쪽, y는 아래쪽으로 커진다.
- 면적은 ㎡로 표시하고, 평은 ㎡ ÷ 3.3058로 계산한다.

## 도면 (`plan.json`)

예시: [data/plans/example/plan.json](../data/plans/example/plan.json), 그 평면도 이미지: [floorplan.png](../data/plans/example/floorplan.png)

```json
{
  "name": "예시 아파트 (24평형)",
  "ceilingHeight": 230,
  "walls": [ { "id": "w-top", "a": { "x": 0, "y": 0 }, "b": { "x": 1100, "y": 0 }, "thickness": 20 } ],
  "openings": [
    { "id": "d-entry", "type": "door", "wall": "w-top", "t": 570, "width": 100, "hinge": "start", "opensInto": "r-living" },
    { "id": "n-living", "type": "window", "wall": "w-bottom", "t": 530, "width": 240 }
  ],
  "rooms": [ { "id": "r-living", "name": "거실·주방", "polygon": [ { "x": 386, "y": 10 }, { "x": 754, "y": 10 }, { "x": 754, "y": 790 }, { "x": 386, "y": 790 } ] } ]
}
```

| 항목 | 뜻 |
| --- | --- |
| `ceilingHeight` | 천장 높이. 3D에서 벽 높이로 쓴다 |
| `walls[]` | 벽. `a`에서 `b`까지의 중심선과 두께(`thickness`)로 적는다. 벽은 중심선 양쪽으로 두께의 절반씩 차지한다 |
| `openings[]` | 벽에 난 문(`door`)과 창문(`window`). `wall`은 벽 id, `t`는 벽의 `a` 끝에서 개구부 중심까지 거리, `width`는 개구부 폭이다 |
| `hinge` | 문만 있다. 경첩이 개구부의 어느 끝에 있는지 적는다. `start`는 벽의 `a` 쪽 끝, `end`는 `b` 쪽 끝이다 |
| `opensInto` | 문만 있다. 문이 열리며 들어가는 방의 id다 |
| `rooms[]` | 방. `polygon`은 벽 안쪽 바닥 경계(벽 두께를 뺀 실제 바닥)를 시계 방향으로 적는다. 방 면적은 이 다각형의 넓이다 |

문이 열리는 자리는 경첩을 중심으로 반지름이 `width`인 사분원이다. `opensInto` 방 쪽에, 경첩에서 개구부의 반대쪽 끝을 향하는 방향으로 놓인다. 평면도 이미지에서 점선 호로 그린 부분이다.

평면도 이미지의 치수선은 벽 중심선 사이 거리를 mm로 적은 것이다. 예를 들어 맨 위 11,000은 왼쪽 바깥벽 중심선에서 오른쪽 바깥벽 중심선까지 11m라는 뜻이다.

## 가구 목록 (`catalog.json`)

예시: [data/catalog.json](../data/catalog.json) (20종)

```json
{ "id": "sofa-3", "name": "3인 소파", "category": "sofa", "width": 210, "depth": 92, "height": 83, "price": 849000, "color": "#8b6b53" }
```

| 항목 | 뜻 |
| --- | --- |
| `width` | 정면 폭. 사람이 다가가 쓰는 면이 정면이다(소파·옷장·아기 침대는 긴 면, 침대는 발 쪽 면) |
| `depth` | 앞뒤 깊이 |
| `height` | 높이. 3D 상자의 높이로 쓴다 |
| `category` | 종류. 규칙에 쓰인다(`rug`, `crib`, `wardrobe`, `dresser`, `fridge`, `washer` 등). 전체 목록은 shared/types.ts에 있다 |
| `price` | 원 단위 가격 |
| `color` | 화면에 칠할 색 |

상품 사진에서 가져온 가구도 같은 형식으로 만든다.

## 배치

예시: [samples/](../samples/) 의 파일 3개. 앱이 배치를 저장할 파일 이름과 위치는 각자 정한다.

```json
{
  "plan": "example",
  "items": [ { "id": "sofa-1", "catalogId": "sofa-3", "x": 432, "y": 600, "rotation": 270 } ]
}
```

| 항목 | 뜻 |
| --- | --- |
| `plan` | 어느 도면 위의 배치인지. `data/plans/` 아래 폴더 이름이다(예: `example`) |
| `items[].id` | 배치한 가구 하나의 id. 같은 가구를 여러 개 놓아도 id는 서로 다르다 |
| `items[].catalogId` | 가구 목록의 id |
| `x`, `y` | 바닥 직사각형의 중심 |
| `rotation` | 위에서 볼 때 시계 방향 회전 각도. 0, 90, 180, 270 중 하나 |

회전과 정면의 관계는 다음과 같다. 회전 0이면 정면이 아래(+y)를 향한다. 시계 방향으로 돌리므로 90이면 왼쪽(−x), 180이면 위(−y), 270이면 오른쪽(+x)을 향한다.

| 회전 | 정면 방향 | 바닥 직사각형 가로 × 세로 |
| --- | --- | --- |
| 0 | 아래 (+y) | width × depth |
| 90 | 왼쪽 (−x) | depth × width |
| 180 | 위 (−y) | width × depth |
| 270 | 오른쪽 (+x) | depth × width |
