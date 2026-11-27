// 도면·가구·배치 파일의 형식. 자세한 설명은 docs/plan-format.md에 있다.
// 단위는 모두 cm. 좌표는 x가 오른쪽, y가 아래쪽으로 커진다.

export interface Point {
  x: number
  y: number
}

/** 벽. a에서 b까지의 중심선과 두께로 적는다. */
export interface Wall {
  id: string
  a: Point
  b: Point
  thickness: number
}

/** 벽에 난 문이나 창문. t는 벽의 a 끝에서 개구부 중심까지 거리. */
export interface DoorOpening {
  id: string
  type: 'door'
  wall: string
  t: number
  width: number
  /** 경첩이 개구부의 어느 끝에 있는지. start는 벽의 a 쪽, end는 b 쪽. */
  hinge: 'start' | 'end'
  /** 문이 열리며 들어가는 방의 id. */
  opensInto: string
}

export interface WindowOpening {
  id: string
  type: 'window'
  wall: string
  t: number
  width: number
}

export type Opening = DoorOpening | WindowOpening

/** 방. polygon은 벽 안쪽 바닥 경계를 시계 방향으로 적는다. */
export interface Room {
  id: string
  name: string
  polygon: Point[]
}

export interface Plan {
  name: string
  ceilingHeight: number
  walls: Wall[]
  openings: Opening[]
  rooms: Room[]
}

export type FurnitureCategory =
  | 'sofa'
  | 'bed'
  | 'crib'
  | 'wardrobe'
  | 'dresser'
  | 'desk'
  | 'chair'
  | 'shelf'
  | 'table'
  | 'tv-stand'
  | 'fridge'
  | 'washer'
  | 'rug'
  | 'plant'
  | 'lamp'
  | 'changing-table'
  | 'generic'

/** 가구 한 종류. width는 정면 폭, depth는 앞뒤 깊이. */
export interface CatalogItem {
  id: string
  name: string
  category: FurnitureCategory
  width: number
  depth: number
  height: number
  price: number
  color: string
}

/** 배치한 가구 하나. x, y는 바닥 직사각형의 중심. rotation은 위에서 볼 때 시계 방향 각도. */
export interface LayoutItem {
  id: string
  catalogId: string
  x: number
  y: number
  rotation: 0 | 90 | 180 | 270
}

export interface Layout {
  plan: string
  items: LayoutItem[]
}
