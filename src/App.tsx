/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Copy, RefreshCw, Trash2, CheckCircle2 } from 'lucide-react';

type IssueType = 'AC not cooling' | 'No heat' | 'Strange noise' | 'Maintenance' | 'Quote request' | 'Other';
type UrgencyType = 'ASAP' | 'Today' | 'Tomorrow' | 'This week';
type ToneType = 'Friendly' | 'Professional';

interface FormData {
  companyName: string;
  repName: string;
  customerName: string;
  city: string;
  issue: IssueType;
  otherIssue: string;
  urgency: UrgencyType;
  tone: ToneType;
  humanTouch: boolean;
}

interface MessageVariation {
  id: string;
  text: string;
}

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    repName: '',
    customerName: '',
    city: '',
    issue: 'AC not cooling',
    otherIssue: '',
    urgency: 'Today',
    tone: 'Friendly',
    humanTouch: true,
  });

  const [variations, setVariations] = useState<MessageVariation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const clearForm = () => {
    setFormData({
      companyName: '',
      repName: '',
      customerName: '',
      city: '',
      issue: 'AC not cooling',
      otherIssue: '',
      urgency: 'Today',
      tone: 'Friendly',
      humanTouch: true,
    });
    setVariations([]);
    setSelectedId(null);
    setCopied(false);
  };

  const generateMessages = () => {
    const { companyName, repName, customerName, city, issue, otherIssue, urgency, tone, humanTouch } = formData;
    
    if (!companyName || !repName || !customerName) {
      alert('Please fill in Company, Rep, and Customer names.');
      return;
    }

    const actualIssue = issue === 'Other' ? otherIssue : issue;
    const urgencyText = urgency === 'ASAP' ? 'right away' : urgency.toLowerCase();
    
    // Base Templates
    const templates = [
      (c: string, r: string, cust: string, i: string, u: string, t: ToneType, h: boolean, cityVal: string) => {
        const opener = h ? `Hey ${cust}—it’s ${r} with ${c}.` : `Hi ${cust}, this is ${r} from ${c}.`;
        const cityMention = cityVal && Math.random() > 0.5 ? ` here in ${cityVal}` : '';
        const body = `Saw your ${i} come through${cityMention}. We can get someone out ${u}.`;
        const closing = `Does that work for you?`;
        const emoji = (h && t === 'Friendly') ? ' 🛠️' : '';
        return `${opener} ${body} ${closing}${emoji}`;
      },
      (c: string, r: string, cust: string, i: string, u: string, t: ToneType, h: boolean, cityVal: string) => {
        const opener = h ? `${cust}, it's ${r} at ${c}.` : `Hello ${cust}, ${r} here from ${c}.`;
        const body = `Got your ${i}. I'm looking at our schedule for ${u}.`;
        const closing = `Should I put you down for a visit?`;
        return `${opener} ${body} ${closing}`;
      },
      (c: string, r: string, cust: string, i: string, u: string, t: ToneType, h: boolean, cityVal: string) => {
        const opener = h ? `Hi ${cust}! ${r} with ${c} here.` : `Hi ${cust}, this is ${r} from ${c}.`;
        const body = `About that ${i}… we have a tech available ${u} if you'd like us to take a look.`;
        const closing = `Want me to lock that in?`;
        const emoji = (h && t === 'Friendly') ? ' 👍' : '';
        return `${opener} ${body} ${closing}${emoji}`;
      },
      (c: string, r: string, cust: string, i: string, u: string, t: ToneType, h: boolean, cityVal: string) => {
        const opener = h ? `Hey ${cust}, ${r} from ${c}.` : `${cust}, this is ${r} with ${c}.`;
        const body = `Saw your ${i} come through. We can definitely help you out ${u}.`;
        const closing = `Are you going to be around then?`;
        return `${opener} ${body} ${closing}`;
      },
      (c: string, r: string, cust: string, i: string, u: string, t: ToneType, h: boolean, cityVal: string) => {
        const opener = h ? `${cust}—${r} here with ${c}.` : `Hi ${cust}, ${r} from ${c} calling back.`;
        const body = `Got your ${i}. I can get a tech to your place ${u}.`;
        const closing = `Does that timing work for you?`;
        return `${opener} ${body} ${closing}`;
      },
      (c: string, r: string, cust: string, i: string, u: string, t: ToneType, h: boolean, cityVal: string) => {
        const opener = h ? `Hi ${cust}, it's ${r} from ${c}.` : `Hello ${cust}, this is ${r} with ${c}.`;
        const body = `About that ${i}… we have an opening ${u} to come check it out.`;
        const closing = `Would you like that spot?`;
        return `${opener} ${body} ${closing}`;
      }
    ];

    // Shuffle and pick 3
    const shuffled = [...templates].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    
    const newVariations = selected.map((tpl, idx) => ({
      id: String.fromCharCode(65 + idx),
      text: tpl(companyName, repName, customerName, actualIssue, urgencyText, tone, humanTouch, city)
    }));

    setVariations(newVariations);
    setSelectedId('A');
    setCopied(false);
  };

  const copyToClipboard = () => {
    const selected = variations.find(v => v.id === selectedId);
    if (selected) {
      navigator.clipboard.writeText(selected.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="bg-[#111827] text-white py-8 px-4 shadow-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl uppercase">
            MEERAKAPP<span className="text-sm font-light align-top ml-0.5 opacity-80">™</span>
          </h1>
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl mt-1 opacity-90">
            30-Second Responder System
          </h2>
          <p className="mt-2 text-blue-300 font-medium">
            Turn missed calls into booked jobs in 30 seconds.
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Company & Rep */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g. Arctic Air"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Rep Name</label>
                  <input
                    type="text"
                    name="repName"
                    value={formData.repName}
                    onChange={handleInputChange}
                    placeholder="e.g. Mike"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Customer Name</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="e.g. Sarah"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">City (Optional)</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Austin"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Right Column: Issue & Urgency */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Issue</label>
                  <select
                    name="issue"
                    value={formData.issue}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  >
                    <option>AC not cooling</option>
                    <option>No heat</option>
                    <option>Strange noise</option>
                    <option>Maintenance</option>
                    <option>Quote request</option>
                    <option>Other</option>
                  </select>
                </div>
                {formData.issue === 'Other' && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Describe Issue</label>
                    <input
                      type="text"
                      name="otherIssue"
                      value={formData.otherIssue}
                      onChange={handleInputChange}
                      placeholder="e.g. Leaking water"
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Urgency</label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  >
                    <option>ASAP</option>
                    <option>Today</option>
                    <option>Tomorrow</option>
                    <option>This week</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Tone</label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="tone"
                        value="Friendly"
                        checked={formData.tone === 'Friendly'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">Friendly</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="tone"
                        value="Professional"
                        checked={formData.tone === 'Professional'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">Professional</span>
                    </label>
                  </div>
                </div>
                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="humanTouch"
                      checked={formData.humanTouch}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm font-medium group-hover:text-orange-600 transition-colors">Add slight human touch</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={generateMessages}
                className="flex-1 min-w-[140px] bg-[#2563EB] hover:bg-[#1E40AF] text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Generate
              </button>
              <button
                onClick={clearForm}
                className="bg-white hover:bg-gray-50 text-gray-600 font-bold py-3 px-6 rounded-xl border border-gray-200 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Clear
              </button>
            </div>
          </div>

          {/* Output Section */}
          {variations.length > 0 && (
            <div className="border-t border-gray-100 bg-gray-50/50 p-8 animate-in fade-in duration-500">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Generated Variations</h2>
              <div className="space-y-4">
                {variations.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedId(v.id)}
                    className={`relative p-5 rounded-xl border-2 transition-all cursor-pointer group ${
                      selectedId === v.id
                        ? 'bg-white border-blue-500 shadow-sm'
                        : 'bg-white/50 border-transparent hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors ${
                        selectedId === v.id ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300 text-gray-400'
                      }`}>
                        {v.id}
                      </div>
                      <div className="flex-1">
                        <p className="text-[15px] leading-relaxed pr-8">{v.text}</p>
                        <div className="mt-3 flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          <span>{v.text.length} Characters</span>
                          {v.text.length <= 320 && <span className="text-emerald-500">SMS Friendly</span>}
                        </div>
                      </div>
                    </div>
                    {selectedId === v.id && (
                      <div className="absolute top-4 right-4 text-blue-500">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button
                  onClick={copyToClipboard}
                  disabled={!selectedId}
                  className={`w-full font-bold py-4 px-6 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                    copied
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#111827] hover:bg-black text-white'
                  }`}
                >
                  <Copy className="w-5 h-5" />
                  {copied ? 'Copied to Clipboard!' : 'Copy Selected Message'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <footer className="mt-8 text-center text-gray-400 text-xs">
          <p>@Meerakapp™ 30-Second Responder System</p>
        </footer>
      </main>
    </div>
  );
}
