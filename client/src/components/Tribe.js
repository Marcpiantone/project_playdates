import React, { useEffect } from "react";

import styled from "styled-components";
import { getTribe } from "../store/reducers/tribe.reducer";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { requestTribe, receiveTribe } from "../store/actions/tribe";
import Loading from "./Loading";
import { getTotem } from "../assets/tribes-totems/totems";
import { colors, colorSelector, totemColors, numbers } from "./GlobalStyles";
import TribeMembers from "./TribeMembers";
import TribeEvents from "./TribeEvents";

const Tribe = () => {
  const params = useParams();
  const tribeId = params.id;

  const dispatch = useDispatch();

  const handleTribe = (tribeId) => {
    console.log(tribeId);
    dispatch(requestTribe());
    console.log("requesting");
    fetch(`/tribes/tribe/${tribeId}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data);
        dispatch(receiveTribe(json.data));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleTribe(tribeId);
  }, []);

  const tribeState = useSelector(getTribe);

  const isLoading = tribeState.status === "loading";
  const tribe = tribeState.tribe;

  const totem = tribe ? getTotem(tribe.logo, "100px", tribe.color) : null;

  const color = tribe ? colorSelector(totemColors, tribe.color) : null;

  return (
    <DIV>
      {isLoading && <Loading />}
      {!isLoading && (
        <TribeWrapper>
          <SmallerHeader>
            <TotemDiv>{totem}</TotemDiv>
            <Column>
              <NameDIV style={{ color }}>{tribe.name}</NameDIV>
              <MissionDIV>"{tribe.description}"</MissionDIV>
            </Column>
          </SmallerHeader>
          <TribeBody>
            <TribeMembers
              members={tribe.members}
              tribeId={tribeId}
              handleTribe={handleTribe}
              isLoading={isLoading}
            />
            <TribeEvents />
          </TribeBody>
        </TribeWrapper>
      )}
    </DIV>
  );
};

const DIV = styled.div``;

const TribeWrapper = styled.div``;

const SmallerHeader = styled.div`
  display: flex;
  align-items: center;
  height: ${numbers.smallerHeaderHeight};
  border-bottom: 1px solid ${colors.lightershadow};
`;

const TotemDiv = styled.div`
  padding: 10px;
`;

const Column = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NameDIV = styled.div`
  font-size: 2em;
`;

const MissionDIV = styled.div`
  color: ${colors.darktext};
`;

const TribeBody = styled.div`
  display: flex;
  background-color: ${colors.superlightershadow};
`;
export default Tribe;
