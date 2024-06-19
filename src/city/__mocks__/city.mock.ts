import { stateMock } from "../../state/__mocks__/state.mock";
import { CityEntity } from "../entities/city.entity";

export const cityMock: CityEntity = {
    createdAt: new Date(),
    id: 1544,
    name: "teste",
    stateId: stateMock.id,
    updatedAt: new Date()
}