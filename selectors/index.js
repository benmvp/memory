export const getUserSequenceMatches = (sequence, userSequence) => (
    sequence.take(userSequence.size).equals(userSequence)
);
