import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PeopleSidebar } from "./PeopleSidebar";
import { getMicrophonePresences } from "../../utils/microphone-presence";
import ProfileEntryPanel from "../profile-entry-panel";
import { UserProfileSidebarContainer } from "./UserProfileSidebarContainer";
import { FormattedMessage, useIntl } from "react-intl";
import { BackButton } from "../input/BackButton";
import { CloseButton } from "../input/CloseButton";
import { Sidebar } from "../sidebar/Sidebar";
import { Profile } from "../profile/Profile";
import { useCan } from "./useCan";
import { useRoomPermissions } from "./useRoomPermissions";
import { useRole } from "./useRole";

export function userFromPresence(sessionId, presence, micPresences, mySessionId, voiceEnabled) {
  const meta = presence.metas[presence.metas.length - 1];
  const micPresence = micPresences.get(sessionId);
  if (micPresence && !voiceEnabled && !meta.permissions.voice_chat) {
    micPresence.muted = true;
  }
  return { id: sessionId, isMe: mySessionId === sessionId, micPresence, ...meta };
}

function usePeopleList(presences, mySessionId, micUpdateFrequency = 500) {
  const [people, setPeople] = useState([]);
  const { voice_chat: voiceChatEnabled } = useRoomPermissions();

  useEffect(() => {
    let timeout;

    function updateMicrophoneState() {
      const micPresences = getMicrophonePresences();

      setPeople(
        Object.entries(presences).map(([id, presence]) => {
          return userFromPresence(id, presence, micPresences, mySessionId, voiceChatEnabled);
        })
      );

      timeout = setTimeout(updateMicrophoneState, micUpdateFrequency);
    }

    updateMicrophoneState();

    return () => {
      clearTimeout(timeout);
    };
  }, [presences, micUpdateFrequency, setPeople, mySessionId, voiceChatEnabled]);

  return people;
}

function PeopleListContainer({ hubChannel, people, onSelectPerson, onClose }) {
  const onMuteAll = useCallback(() => {
    for (const person of people) {
      if (person.presence === "room" && person.permissions && !person.permissions.mute_users) {
        hubChannel.mute(person.id);
      }
    }
  }, [people, hubChannel]);
  const canVoiceChat = useCan("voice_chat");
  const { voice_chat: voiceChatEnabled } = useRoomPermissions();
  const isMod = useRole("owner");

  return (
    <PeopleSidebar
      people={people}
      onSelectPerson={onSelectPerson}
      onClose={onClose}
      onMuteAll={onMuteAll}
      showMuteAll={hubChannel.can("mute_users")}
      canVoiceChat={canVoiceChat}
      voiceChatEnabled={voiceChatEnabled}
      isMod={isMod}
    />
  );
}

PeopleListContainer.propTypes = {
  onSelectPerson: PropTypes.func.isRequired,
  hubChannel: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  people: PropTypes.array.isRequired
};

export function PeopleSidebarContainer({
  hubChannel,
  presences,
  mySessionId,
  displayNameOverride,
  store,
  mediaSearchStore,
  showBackButton,
  performConditionalSignIn,
  onCloseDialog,
  showNonHistoriedDialog,
  onClose
}) {
  const people = usePeopleList(presences, mySessionId);
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const thisPerson = people.find(person => person.id === mySessionId);
  const selectedPerson = people.find(person => person.id === selectedPersonId);
  const setSelectedPerson = useCallback(
    person => {
      setSelectedPersonId(person.id);
    },
    [setSelectedPersonId]
  );

  if (selectedPerson) {
    if (thisPerson.roles.owner && selectedPerson.id === mySessionId) {
      return (
        <UserProfileSidebarContainer
          user={selectedPerson}
          hubChannel={hubChannel}
          performConditionalSignIn={performConditionalSignIn}
          showBackButton
          onBack={() => setSelectedPersonId(null)}
          onCloseDialog={onCloseDialog}
          showNonHistoriedDialog={showNonHistoriedDialog}
        />
      );
    } else {
      return (
        <Sidebar
          title={<FormattedMessage id="avatar-settings-sidebar.title" defaultMessage="Profile" />}
          beforeTitle={showBackButton ? <BackButton onClick={() => setSelectedPersonId(null)} /> : <CloseButton onClick={onClose} />}
        >
          <Profile
            name={selectedPerson.profile.displayName}
            isMe={selectedPerson.isMe}
            rank={'DIAMOND'}
            status={'This is where a users bio will be. ' +
              'This is where a users bio will be. This is where a users bio will be.'}
          />
        </Sidebar>
      );
    }
  }

  return (
    <PeopleListContainer onSelectPerson={setSelectedPerson} onClose={onClose} hubChannel={hubChannel} people={people} />
  );
}

PeopleSidebarContainer.propTypes = {
  displayNameOverride: PropTypes.string,
  store: PropTypes.object.isRequired,
  mediaSearchStore: PropTypes.object.isRequired,
  hubChannel: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  mySessionId: PropTypes.string.isRequired,
  presences: PropTypes.object.isRequired,
  performConditionalSignIn: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  showNonHistoriedDialog: PropTypes.func.isRequired
};
