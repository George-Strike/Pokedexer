import { Col, Input, Row } from "antd";
import { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PokemonContext } from "../App";
import { IDisplayPokemon } from "../interfaces/IDisplayPokemon";
import { IPokemon } from "../interfaces/IPokemon";
import './pokedex.css';
import PokemonCard from "./pokemonCards/pokemonCard";

const Pokedex: FC = () => {

    const [searchParam] = useState(["name", "id"]);
    const [q, setQ] = useState("");
    const pokemon = useContext(PokemonContext);


    const search = (pokemonArr: IPokemon[]) => {
        return pokemonArr.filter((pokemon: IPokemon) => {
            return searchParam.some((filteredPokemon) => {
                return (
                    // @ts-ignore: Object is possibly 'null'.
                    pokemon[filteredPokemon]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                );
            });
        });
    };

    return (
        <div className="site-card-wrapper" style={{ textAlign: 'center', zIndex: 1, width: '100%' }}>
            <Row gutter={16} style={{ paddingBottom: '30px', paddingTop: '30px' }}>
                <Col span={8}> </Col>
                <Col span={8}>
                    <div className="search-wrapper">
                        <Input placeholder="Search by name or id Eg: Pikachu, 167 (spinarak)"
                            name="search-form"
                            id="search-form"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            type="search"
                        />
                    </div>
                </Col>
                <Col span={8}> </Col>
            </Row>
            <Row gutter={16}>
                {pokemon.length > 0 ? search(pokemon).map(poke => {
                    let displayPoke: IDisplayPokemon = {
                        id: poke.id, 
                        name: poke.name, 
                        types: poke.types,
                        maleFrontSprite: poke.maleFrontSprite,
                        maleFrontSpriteShiny: poke.maleFrontSpriteShiny,
                        femaleFrontSprite: poke.femaleFrontSprite,
                        femaleFrontSpriteShiny: poke.femaleFrontSpriteShiny,
                        maleBackSprite:poke.maleBackSprite,
                        femaleBackSprite: poke.femaleBackSprite
                    }
                    return <Col span={8} key={poke.id}>
                        <Link to={`pokemon/${poke.name}`} >
                            <PokemonCard {...displayPoke} allowHover={true} />
                        </Link>
                    </Col>
                }) : ""}
            </Row>
        </div>
    );
}
export default Pokedex;
