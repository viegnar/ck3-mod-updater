import Button from "react-bootstrap/Button";
import LoadingSpinner from "./LoadingSpinner";
import ModList, { ModTemplate } from "./ModList";
import React, { useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import classNames from "classnames";
import { useTranslation, withTranslation } from "react-i18next";
import { faDownload, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const dummy_mod_list: ModTemplate[] = [
  {
    id: "111",
    name: "Multiplayer Tweaks",
    version: "8 Ağustos 2022 22:08",
    state: "needs_update",
    updateVersion: "8 Ağustos 2022 22:08",
  },
  {
    id: "222",
    name: "Less Shattered Britannia",
    version: "8 Ağustos 2022 22:08",
    state: "updated",
    updateVersion: "",
  },
  {
    id: "333",
    name: "Some other mod",
    version: "8 Ağustos 2022 22:08",
    state: "not_installed",
    updateVersion: "",
  },
  {
    id: "444",
    name: "Some other mod",
    version: "8 Ağustos 2022 22:08",
    state: "not_installed",
    updateVersion: "",
  },
  {
    id: "555",
    name: "Some other mod",
    version: "8 Ağustos 2022 22:08",
    state: "not_installed",
    updateVersion: "",
  },
  {
    id: "666",
    name: "Some other mod",
    version: "8 Ağustos 2022 22:08",
    state: "not_installed",
    updateVersion: "",
  },
  {
    id: "777",
    name: "Some other mod",
    version: "8 Ağustos 2022 22:08",
    state: "not_installed",
    updateVersion: "",
  },
  {
    id: "888",
    name: "Some other mod",
    version: "8 Ağustos 2022 22:08",
    state: "not_installed",
    updateVersion: "",
  },
];

function App() {
  const { t } = useTranslation();
  const [mods, setMods] = useState<ModTemplate[]>([]);
  const [checking, setChecking] = useState(false);
  const [updating, setUpdating] = useState(false);

  const init = async () => {
    if (window.electronAPI) {
      setMods(await window.electronAPI.init());
    }
  };

  const check = async () => {
    setChecking(true);
    if (window.electronAPI) {
      setMods(await window.electronAPI.check());
      setChecking(false);
    }
  };

  const update = async () => {
    setUpdating(true);
    if (window.electronAPI) {
      setMods(await window.electronAPI.update());
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (window.electronAPI) {
      init();
    } else {
      setMods(dummy_mod_list);
    }
  }, []);

  if (!mods.length) {
    return <LoadingSpinner />;
  }

  return (
    <div className="vh-100 w-100 d-flex flex-column overflow-hidden">
      <div>
        <Toolbar check={check} />
      </div>
      <div id="mod-list">
        <ModList mods={mods} />
      </div>
      <div className="d-flex flex-row-reverse my-3">
        <Button variant="primary" className="me-3" disabled={checking || updating} onClick={update}>
          <FontAwesomeIcon icon={faDownload} className={classNames("fa-fw me-2", { "fa-beat": updating })} />
          {t("mod.actions.update")}
        </Button>
        <Button variant="secondary" className="me-3" disabled={checking || updating} onClick={check}>
          <FontAwesomeIcon icon={faRotate} className={classNames("fa-fw me-2", { "fa-spin": checking })} />
          {t("mod.actions.check")}
        </Button>
      </div>
    </div>
  );
}

export default withTranslation()(App);
