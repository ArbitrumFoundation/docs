import React, { useEffect, useState } from 'react';

const pointsToToken = {
  0: 0,
  1: 0,
  2: 0,
  3: 625,
  4: 875,
  5: 1125,
  6: 1625,
  7: 1875,
  8: 2125,
  9: 3125,
  10: 3375,
  11: 3625,
  12: 5125,
  13: 5125,
  14: 5125,
  15: 5125,
};

export const PointToTokenCalculator = () => {
  const [preNitroPts, setPreNitroPts] = useState(0);
  const [postNitroPts, setPostNitroPts] = useState(0);
  const [novaPts, setNovaPts] = useState(0);
  const [preNitroMultiplierEnabled, setPreNitroMultiplierEnabled] =
    useState(false);
  const [novaPointsDiscountedToOne, setNovaPointsDiscountedToOne] =
    useState(false);
  const [tokensEntitled, setTokensEntitled] = useState(0);
  const finalNovaPts = novaPointsDiscountedToOne ? 1 : novaPts;
  const arbOnePts =
    preNitroPts + postNitroPts > 14 ? 14 : preNitroPts + postNitroPts;

  const preNitroPtOnChange = (event) => {
    const newPreNitroPt = Number(event.target.value);
    setPostNitroPts(
      postNitroPts + newPreNitroPt > 14 ? 14 - newPreNitroPt : postNitroPts
    );
    setPreNitroPts(newPreNitroPt);
  };

  const postNitroPtOnChange = (event) => {
    const newPostNitroPt = Number(event.target.value);
    setPreNitroPts(
      preNitroPts + newPostNitroPt > 14 ? 14 - newPostNitroPt : preNitroPts
    );
    setPostNitroPts(newPostNitroPt);
  };

  useEffect(() => {
    setPreNitroMultiplierEnabled(preNitroPts >= 3);
    setNovaPointsDiscountedToOne(arbOnePts >= 4 && novaPts >= 1);
    setPostNitroPts(
      preNitroPts + postNitroPts > 14 ? 14 - preNitroPts : postNitroPts
    );

    let calculateWithArbOneTotalPoints = false;
    if (preNitroPts < 3 && postNitroPts < 3 && arbOnePts >= 3) {
      calculateWithArbOneTotalPoints = true;
    }

    let calculatedTokensEntitled = 0;
    if (calculateWithArbOneTotalPoints) {
      calculatedTokensEntitled = pointsToToken[arbOnePts + finalNovaPts];
    } else {
      calculatedTokensEntitled =
        (preNitroMultiplierEnabled ? 2 : 1) * pointsToToken[preNitroPts] +
        pointsToToken[postNitroPts + finalNovaPts];
    }

    setTokensEntitled(calculatedTokensEntitled);
  }, [
    preNitroPts,
    postNitroPts,
    novaPts,
    finalNovaPts,
    arbOnePts,
    preNitroMultiplierEnabled,
    novaPointsDiscountedToOne,
  ]);

  return (
    <div className="points-tokens-calculator">
      <h4>Calculate how many tokens you might get</h4>
      <div className="networks-wrapper">
        <div className="network-wrapper">
          <h5>Arbitrum One</h5>
          <p>
            Subtotal: <span>{arbOnePts}/14</span>
          </p>
          <div className="inputs-wrapper">
            <div>
              <label>Pre-Nitro Points</label>
              <div>
                <input
                  type="number"
                  min="0"
                  max={14 - postNitroPts}
                  placeholder="Pre-Nitro Points"
                  value={preNitroPts}
                  onChange={preNitroPtOnChange}
                />
                <span>/14</span>
              </div>
              <div className="checklist">
                <label>
                  <input
                    type="checkbox"
                    disabled
                    checked={preNitroMultiplierEnabled}
                  />
                  <span>2x multiplier</span>
                </label>
              </div>
            </div>
            <div>
              <label>Post-Nitro Points</label>
              <div>
                <input
                  type="number"
                  min="0"
                  max={14 - preNitroPts}
                  placeholder="Post-Nitro Points"
                  value={postNitroPts}
                  onChange={postNitroPtOnChange}
                />
                <span>/14</span>
              </div>
            </div>
          </div>
        </div>
        <div className="network-wrapper">
          <div>
            <h5>Arbitrum Nova</h5>
            <p>
              Subtotal:{' '}
              <span>
                {finalNovaPts}
                <sup>*</sup>
              </span>
            </p>
          </div>
          <label className="hidden-label">Nova Points</label>
          <div>
            <input
              type="number"
              min="0"
              max="4"
              placeholder="Arbitrum Nova Points"
              value={novaPts}
              onChange={(event) => setNovaPts(Number(event.target.value))}
            />
            <span>/4</span>
          </div>
        </div>
      </div>
      <div className="checklist">
        <label>
          <input type="checkbox" disabled checked={novaPointsDiscountedToOne} />
          <span>
            <sup>*</sup>Points earned on Arbitrum Nova are counted as 1 point in
            total because you had already scored &ge;4 points on Arbitrum One
          </span>
        </label>
      </div>
      <p className="balance-wrapper">
        <span className="title">Tokens entitled:</span>
        <span>{tokensEntitled}</span>
      </p>
    </div>
  );
};
