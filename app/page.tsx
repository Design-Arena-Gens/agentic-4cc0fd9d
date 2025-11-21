'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Frame {
  id: number
  time: string
  duration: string
  visual: string
  audio: string
  technical: string
  cameraAngle: string
}

const storyboardFrames: Frame[] = [
  {
    id: 1,
    time: '0:00-0:02',
    duration: '2.0s',
    visual: 'Wide shot → Medium Close-Up. Man (30-35yo, Mumbai professional look) enters frame left, walks toward camera. Seamless hair patch at crown (70% density, natural wave). Navy t-shirt. Gray seamless background. Soft studio lighting (5500K).',
    audio: '[VO starts] "Kya aap baal ki tension se pareshan hain?"',
    technical: 'Shot 1: 1920x1080, 30fps. Eye-level camera (1.7m height). Movement: Dolly in slowly. Focus: Face & hair. Lighting: Key light front-left, fill right. Color grade: Neutral, high contrast.',
    cameraAngle: 'Eye-level tracking shot (1.7m height)'
  },
  {
    id: 2,
    time: '0:02-0:04',
    duration: '2.0s',
    visual: 'Tight close-up (shoulders up). Man faces camera directly, warm confident smile. Camera slowly pushes in on face. Hair patch perfectly blended, no visible seams. Clean-shaven, warm Indian skin tone. Eye contact with viewer.',
    audio: '[VO continues] "Deecee Hair Gents Patch—"',
    technical: 'Shot 2: Slow push-in (dolly). Focus rack: Hair → Face → Eyes. Lighting: Soft key light eliminates shadows. Skin tone: Accurate Indian warm undertone. Hair detail: Natural texture visible.',
    cameraAngle: 'Gradual push-in, eye-level'
  },
  {
    id: 3,
    time: '0:04-0:06',
    duration: '2.0s',
    visual: 'Extreme close-up on hair patch crown area. Camera circles 270° around head (left to right). Hair patch seamlessly integrated, natural hairline, no shine/gloss. Light catches natural wave pattern. Background slightly blurred.',
    audio: '[VO continues] "—jispe aap bharosa kar sakte hain."',
    technical: 'Shot 3: Orbital camera movement (270° arc). Speed: Smooth, 2-second rotation. Focus: Crown/patch blend zone. Lighting: Soft wrap-around to show texture. Depth of field: f/2.8 (shallow focus).',
    cameraAngle: '270° orbital rotation around head'
  },
  {
    id: 4,
    time: '0:06-0:08',
    duration: '2.0s',
    visual: 'Return to medium close-up. Man looks directly at camera, confident smile, slight head tilt. Hair looks completely natural. Final frame holds for product logo reveal. Clean, professional aesthetic.',
    audio: '[VO concludes] "Deecee Hair—apne liye sabse best." [Pause] "Deecee Hair."',
    technical: 'Shot 4: Static hold. Perfect symmetry. Logo overlay: Lower third (0:07-0:08). Audio: Clear VO with natural breath. Export: H.264, 1920x1080, 30fps, high bitrate for 4K-like quality.',
    cameraAngle: 'Static frontal shot, eye-level'
  }
]

const projectSpecs = {
  videoSpecs: [
    'Duration: Exactly 8 seconds',
    'Format: 1920x1080p, 30fps',
    'Quality: Premium 4K-like rendering',
    'Style: Hyper-realistic CGI/live-action hybrid'
  ],
  lighting: [
    'Key light: Soft 5500K (front-left)',
    'Fill light: Subtle (right side)',
    'No harsh shadows or highlights',
    'Studio-quality professional lighting'
  ],
  talent: [
    'Age: 30-35 years, Indian male',
    'Look: Mumbai urban professional',
    'Hair: Short black with seamless patch at crown',
    'Patch: 70% density, natural wave, no shine',
    'Face: Clean-shaven, warm smile, relatable'
  ],
  audio: [
    'Mic: Studio quality (Neumann-grade)',
    'Voice: Indian male, warm baritone (140-160Hz)',
    'Accent: Urban Delhi/Mumbai',
    'Style: Clear enunciation, natural pauses'
  ]
}

export default function Home() {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showSpecs, setShowSpecs] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPlaying) {
      const frameDuration = 2000 // 2 seconds per frame
      const progressInterval = 20 // Update every 20ms for smooth progress

      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (progressInterval / frameDuration) * 100
          if (newProgress >= 100) {
            if (currentFrame < storyboardFrames.length - 1) {
              setCurrentFrame((prev) => prev + 1)
              return 0
            } else {
              setIsPlaying(false)
              setCurrentFrame(0)
              return 0
            }
          }
          return newProgress
        })
      }, progressInterval)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    } else {
      setProgress(0)
    }
  }, [isPlaying, currentFrame])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleFrameSelect = (index: number) => {
    setCurrentFrame(index)
    setIsPlaying(false)
    setProgress(0)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentFrame(0)
    setProgress(0)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Deecee Hair Gents Patch
              </h1>
              <p className="text-sm text-gray-400 mt-1">8-Second TVC Storyboard</p>
            </div>
            <button
              onClick={() => setShowSpecs(!showSpecs)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium"
            >
              {showSpecs ? 'Hide' : 'Show'} Technical Specs
            </button>
          </div>
        </div>
      </header>

      {/* Technical Specs Panel */}
      <AnimatePresence>
        {showSpecs && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-blue-400 mb-3">Video Specifications</h3>
                  <ul className="space-y-2">
                    {projectSpecs.videoSpecs.map((spec, i) => (
                      <li key={i} className="text-xs text-gray-300">{spec}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-purple-400 mb-3">Lighting Setup</h3>
                  <ul className="space-y-2">
                    {projectSpecs.lighting.map((spec, i) => (
                      <li key={i} className="text-xs text-gray-300">{spec}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-green-400 mb-3">Talent Requirements</h3>
                  <ul className="space-y-2">
                    {projectSpecs.talent.map((spec, i) => (
                      <li key={i} className="text-xs text-gray-300">{spec}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-orange-400 mb-3">Audio Specifications</h3>
                  <ul className="space-y-2">
                    {projectSpecs.audio.map((spec, i) => (
                      <li key={i} className="text-xs text-gray-300">{spec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Timeline Navigation */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handlePlayPause}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium flex items-center gap-2"
            >
              {isPlaying ? (
                <>
                  <span className="w-4 h-4 flex gap-1">
                    <span className="w-1.5 h-4 bg-white"></span>
                    <span className="w-1.5 h-4 bg-white"></span>
                  </span>
                  Pause
                </>
              ) : (
                <>
                  <span className="w-4 h-4 flex items-center justify-center">
                    <span className="w-0 h-0 border-l-[10px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></span>
                  </span>
                  Play
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors font-medium"
            >
              Reset
            </button>
            <div className="text-sm text-gray-400">
              Frame {currentFrame + 1} of {storyboardFrames.length}
            </div>
          </div>

          {/* Frame Timeline */}
          <div className="grid grid-cols-4 gap-3">
            {storyboardFrames.map((frame, index) => (
              <button
                key={frame.id}
                onClick={() => handleFrameSelect(index)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  currentFrame === index
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <div className="text-left">
                  <div className="text-xs text-gray-400 mb-1">Shot {frame.id}</div>
                  <div className="font-semibold text-sm mb-1">{frame.time}</div>
                  <div className="text-xs text-gray-300">{frame.cameraAngle}</div>
                </div>
                {currentFrame === index && isPlaying && (
                  <div className="mt-3 w-full bg-gray-700 rounded-full h-1 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Current Frame Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFrame}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 overflow-hidden"
          >
            {/* Visual Frame Preview */}
            <div className="aspect-video bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 relative border-b border-gray-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8 max-w-4xl">
                  <div className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/50 rounded-lg mb-6">
                    <div className="text-5xl font-bold text-blue-400">
                      Shot {storyboardFrames[currentFrame].id}
                    </div>
                    <div className="text-xl text-blue-300 mt-2">
                      {storyboardFrames[currentFrame].time}
                    </div>
                  </div>

                  <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
                    <div className="text-gray-300 leading-relaxed">
                      {storyboardFrames[currentFrame].visual}
                    </div>
                  </div>

                  {/* Camera Angle Indicator */}
                  <div className="mt-6 inline-block px-4 py-2 bg-purple-600/20 border border-purple-500/50 rounded-full">
                    <div className="text-sm text-purple-300 font-medium">
                      📹 {storyboardFrames[currentFrame].cameraAngle}
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner Frame Markers */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-blue-500/50"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-blue-500/50"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-blue-500/50"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-blue-500/50"></div>
            </div>

            {/* Frame Details */}
            <div className="p-6 space-y-6">
              {/* Audio/Voiceover */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <h3 className="text-sm font-semibold text-green-400 uppercase tracking-wider">
                    Voiceover / Audio
                  </h3>
                </div>
                <div className="bg-green-950/30 border border-green-900/50 rounded-lg p-4">
                  <p className="text-green-100 leading-relaxed italic">
                    {storyboardFrames[currentFrame].audio}
                  </p>
                </div>
              </div>

              {/* Technical Details */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wider">
                    Technical Details
                  </h3>
                </div>
                <div className="bg-orange-950/30 border border-orange-900/50 rounded-lg p-4">
                  <p className="text-orange-100 leading-relaxed font-mono text-sm">
                    {storyboardFrames[currentFrame].technical}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Production Notes */}
        <div className="mt-8 bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-400">Production Notes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <span className="font-semibold text-white">Total Duration:</span> 8 seconds (exact)
            </div>
            <div>
              <span className="font-semibold text-white">Export Format:</span> H.264, 1920x1080p @ 30fps
            </div>
            <div>
              <span className="font-semibold text-white">Recommended Tools:</span> Runway ML, Pika Labs, After Effects
            </div>
            <div>
              <span className="font-semibold text-white">Color Grading:</span> Neutral, high contrast, accurate skin tones
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12 py-6 text-center text-sm text-gray-500">
        <p>Deecee Hair Gents Patch - Professional TVC Storyboard</p>
        <p className="mt-1">Interactive Preview Tool</p>
      </footer>
    </main>
  )
}
