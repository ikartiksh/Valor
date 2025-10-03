import VoiceAgent from './VoiceAgent.jsx';

function SummaryCard({ data }) {
  return (
    <div className="mt-4 bg-gray-50 p-4 rounded">
      <p><strong>Summary:</strong> {data.summary}</p>
      <p><strong>Rating:</strong> {data.rating}/10</p>
      <p><strong>Estimated Price:</strong> ${data.price}</p>
      <VoiceAgent text={data.summary} />
    </div>
  );
}

export default SummaryCard;